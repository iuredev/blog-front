// A small, deterministic distributed-system simulation for the portfolio canvas.
// It deliberately uses fixed-size storage so the wasm module needs no allocator.

const PACKET_CAPACITY: usize = 64;
const NODE_COUNT: usize = 8;
const WORKER_COUNT: usize = 3;

const STAGE_INACTIVE: u8 = 0;
const STAGE_GATEWAY: u8 = 1;
const STAGE_QUEUE: u8 = 2;
const STAGE_WORKER: u8 = 3;
const STAGE_CACHE: u8 = 4;
const STAGE_DATABASE: u8 = 5;
const STAGE_RESPONSE: u8 = 6;

const STATUS_NORMAL: u8 = 0;
const STATUS_CACHE_HIT: u8 = 1;
const STATUS_CACHE_MISS: u8 = 2;
const STATUS_RETRY: u8 = 3;
const STATUS_DROPPED: u8 = 4;

#[derive(Clone, Copy)]
struct Packet {
    id: u32,
    stage: u8,
    status: u8,
    worker: i8,
    retries: u8,
    age: u16,
    duration: u16,
}

impl Packet {
    const EMPTY: Self = Self {
        id: 0,
        stage: STAGE_INACTIVE,
        status: STATUS_NORMAL,
        worker: -1,
        retries: 0,
        age: 0,
        duration: 1,
    };
}

struct Simulation {
    packets: [Packet; PACKET_CAPACITY],
    node_failure: [u32; NODE_COUNT],
    tick: u32,
    rng: u32,
    next_id: u32,
    next_arrival: u16,
    spike_ticks: u32,
    spike_intensity: u32,
    total: u32,
    completed: u32,
    hits: u32,
    misses: u32,
    retries: u32,
    dropped: u32,
}

impl Simulation {
    const fn new() -> Self {
        Self {
            packets: [Packet::EMPTY; PACKET_CAPACITY],
            node_failure: [0; NODE_COUNT],
            tick: 0,
            rng: 0x6d2b_79f5,
            next_id: 1,
            next_arrival: 24,
            spike_ticks: 0,
            spike_intensity: 1,
            total: 0,
            completed: 0,
            hits: 0,
            misses: 0,
            retries: 0,
            dropped: 0,
        }
    }

    fn random(&mut self) -> u32 {
        let mut x = self.rng;
        x ^= x << 13;
        x ^= x >> 17;
        x ^= x << 5;
        self.rng = x;
        x
    }

    fn duration(&mut self, base: u16, variation: u16) -> u16 {
        base + (self.random() % variation as u32) as u16
    }

    fn spawn(&mut self) {
        self.total = self.total.wrapping_add(1);
        let duration = self.duration(18, 16);
        if let Some(slot) = self.packets.iter_mut().find(|p| p.stage == STAGE_INACTIVE) {
            *slot = Packet {
                id: self.next_id,
                stage: STAGE_GATEWAY,
                status: STATUS_NORMAL,
                worker: -1,
                retries: 0,
                age: 0,
                duration,
            };
            self.next_id = self.next_id.wrapping_add(1).max(1);
        } else {
            self.dropped = self.dropped.wrapping_add(1);
        }
    }

    fn worker_busy(&self, worker: usize, except: usize) -> bool {
        self.packets.iter().enumerate().any(|(index, packet)| {
            index != except && packet.stage == STAGE_WORKER && packet.worker == worker as i8
        })
    }

    fn available_worker(&self, except: usize) -> Option<usize> {
        (0..WORKER_COUNT).find(|worker| {
            self.node_failure[2 + *worker] == 0 && !self.worker_busy(*worker, except)
        })
    }

    fn retry_or_drop(&mut self, index: usize) {
        let packet = &mut self.packets[index];
        if packet.status == STATUS_DROPPED {
            packet.age = 0;
            packet.duration = 28;
            return;
        }
        if packet.retries < 2 {
            packet.retries += 1;
            packet.status = STATUS_RETRY;
            if packet.stage == STAGE_WORKER {
                packet.stage = STAGE_QUEUE;
                packet.worker = -1;
            }
            packet.age = 0;
            packet.duration = packet.duration.saturating_add(12);
            self.retries = self.retries.wrapping_add(1);
        } else {
            packet.status = STATUS_DROPPED;
            packet.stage = STAGE_RESPONSE;
            packet.worker = -1;
            packet.age = 0;
            packet.duration = 28;
            self.dropped = self.dropped.wrapping_add(1);
        }
    }

    fn advance_packet(&mut self, index: usize) {
        let stage = self.packets[index].stage;
        if stage == STAGE_INACTIVE || stage == STAGE_QUEUE {
            return;
        }

        let failed_node = match stage {
            STAGE_GATEWAY => Some(0),
            STAGE_WORKER => Some(2 + self.packets[index].worker.max(0) as usize),
            STAGE_CACHE => Some(5),
            STAGE_DATABASE => Some(6),
            STAGE_RESPONSE => Some(7),
            _ => None,
        };
        if failed_node.is_some_and(|node| self.node_failure[node] > 0) {
            if self.packets[index].age >= self.packets[index].duration {
                self.retry_or_drop(index);
            } else {
                self.packets[index].age += 1;
            }
            return;
        }

        self.packets[index].age += 1;
        if self.packets[index].age < self.packets[index].duration {
            return;
        }

        match stage {
            STAGE_GATEWAY => {
                self.packets[index].stage = STAGE_QUEUE;
                self.packets[index].status = STATUS_NORMAL;
                self.packets[index].age = 0;
                self.packets[index].duration = 1;
            }
            STAGE_WORKER => {
                self.packets[index].stage = STAGE_CACHE;
                self.packets[index].status = STATUS_NORMAL;
                self.packets[index].age = 0;
                self.packets[index].duration = self.duration(20, 18);
            }
            STAGE_CACHE => {
                // A stable 68% hit rate, with deterministic variation.
                if self.random() % 100 < 68 {
                    self.hits = self.hits.wrapping_add(1);
                    self.packets[index].status = STATUS_CACHE_HIT;
                    self.packets[index].stage = STAGE_RESPONSE;
                    self.packets[index].duration = self.duration(24, 20);
                } else {
                    self.misses = self.misses.wrapping_add(1);
                    self.packets[index].status = STATUS_CACHE_MISS;
                    self.packets[index].stage = STAGE_DATABASE;
                    self.packets[index].duration = self.duration(45, 40);
                }
                self.packets[index].age = 0;
            }
            STAGE_DATABASE => {
                self.packets[index].stage = STAGE_RESPONSE;
                // Keep cache-miss status visible through the return trip.
                self.packets[index].age = 0;
                self.packets[index].duration = self.duration(28, 24);
            }
            STAGE_RESPONSE => {
                if self.packets[index].status != STATUS_DROPPED {
                    self.completed = self.completed.wrapping_add(1);
                }
                self.packets[index] = Packet::EMPTY;
            }
            _ => {}
        }
    }

    fn assign_workers(&mut self) {
        if self.node_failure[1] > 0 {
            return;
        }
        for index in 0..PACKET_CAPACITY {
            if self.packets[index].stage != STAGE_QUEUE {
                continue;
            }
            let Some(worker) = self.available_worker(index) else {
                break;
            };
            self.packets[index].stage = STAGE_WORKER;
            self.packets[index].worker = worker as i8;
            self.packets[index].status = STATUS_NORMAL;
            self.packets[index].age = 0;
            self.packets[index].duration = self.duration(38, 44);
        }
    }

    fn tick(&mut self) {
        self.tick = self.tick.wrapping_add(1);
        for failure in &mut self.node_failure {
            *failure = failure.saturating_sub(1);
        }
        self.spike_ticks = self.spike_ticks.saturating_sub(1);

        if self.next_arrival == 0 {
            let arrivals = if self.spike_ticks > 0 {
                self.spike_intensity.clamp(1, 8)
            } else {
                1
            };
            for _ in 0..arrivals {
                self.spawn();
            }
            self.next_arrival = if self.spike_ticks > 0 {
                (5 + self.random() % 6) as u16
            } else {
                (30 + self.random() % 42) as u16
            };
        } else {
            self.next_arrival -= 1;
        }

        for index in 0..PACKET_CAPACITY {
            self.advance_packet(index);
        }
        self.assign_workers();
    }
}

static mut SIMULATION: Simulation = Simulation::new();

#[inline]
fn simulation() -> *mut Simulation {
    &raw mut SIMULATION
}

#[unsafe(no_mangle)]
pub extern "C" fn new_scene() {
    unsafe { *simulation() = Simulation::new() };
}

#[unsafe(no_mangle)]
pub extern "C" fn tick() {
    unsafe { (*simulation()).tick() };
}

#[unsafe(no_mangle)]
pub extern "C" fn trigger_traffic_spike(duration_ticks: u32, intensity: u32) {
    unsafe {
        let sim = &mut *simulation();
        sim.spike_ticks = duration_ticks.clamp(1, 3_600);
        sim.spike_intensity = intensity.clamp(1, 8);
        sim.next_arrival = 0;
    }
}

#[unsafe(no_mangle)]
pub extern "C" fn fail_node(node: u32, duration_ticks: u32) {
    if (node as usize) < NODE_COUNT {
        unsafe { (*simulation()).node_failure[node as usize] = duration_ticks.min(3_600) };
    }
}

#[unsafe(no_mangle)]
pub extern "C" fn packet_capacity() -> u32 {
    PACKET_CAPACITY as u32
}

fn packet(index: u32) -> Packet {
    if (index as usize) < PACKET_CAPACITY {
        unsafe { (*simulation()).packets[index as usize] }
    } else {
        Packet::EMPTY
    }
}

#[unsafe(no_mangle)]
pub extern "C" fn packet_active(index: u32) -> u32 {
    (packet(index).stage != STAGE_INACTIVE) as u32
}

#[unsafe(no_mangle)]
pub extern "C" fn packet_id(index: u32) -> u32 {
    packet(index).id
}

#[unsafe(no_mangle)]
pub extern "C" fn packet_stage(index: u32) -> u32 {
    packet(index).stage as u32
}

#[unsafe(no_mangle)]
pub extern "C" fn packet_status(index: u32) -> u32 {
    packet(index).status as u32
}

#[unsafe(no_mangle)]
pub extern "C" fn packet_worker(index: u32) -> i32 {
    packet(index).worker as i32
}

#[unsafe(no_mangle)]
pub extern "C" fn packet_progress(index: u32) -> u32 {
    let packet = packet(index);
    if packet.stage == STAGE_QUEUE {
        0
    } else {
        (packet.age as u32 * 1_000 / packet.duration.max(1) as u32).min(1_000)
    }
}

#[unsafe(no_mangle)]
pub extern "C" fn queue_length() -> u32 {
    unsafe {
        (*simulation())
            .packets
            .iter()
            .filter(|p| p.stage == STAGE_QUEUE)
            .count() as u32
    }
}

#[unsafe(no_mangle)]
pub extern "C" fn worker_state(worker: u32) -> u32 {
    if worker as usize >= WORKER_COUNT {
        return 0;
    }
    unsafe {
        let sim = &*simulation();
        if sim.node_failure[2 + worker as usize] > 0 {
            2
        } else if sim.worker_busy(worker as usize, PACKET_CAPACITY) {
            1
        } else {
            0
        }
    }
}

#[unsafe(no_mangle)]
pub extern "C" fn node_state(node: u32) -> u32 {
    if node as usize >= NODE_COUNT {
        return 0;
    }
    unsafe {
        let sim = &*simulation();
        if sim.node_failure[node as usize] > 0 {
            return 2;
        }
        let busy = match node {
            0 => sim.packets.iter().any(|p| p.stage == STAGE_GATEWAY),
            1 => sim.packets.iter().any(|p| p.stage == STAGE_QUEUE),
            2..=4 => sim.worker_busy((node - 2) as usize, PACKET_CAPACITY),
            5 => sim.packets.iter().any(|p| p.stage == STAGE_CACHE),
            6 => sim.packets.iter().any(|p| p.stage == STAGE_DATABASE),
            7 => sim.packets.iter().any(|p| p.stage == STAGE_RESPONSE),
            _ => false,
        };
        busy as u32
    }
}

#[unsafe(no_mangle)]
pub extern "C" fn total_requests() -> u32 {
    unsafe { (*simulation()).total }
}
#[unsafe(no_mangle)]
pub extern "C" fn completed_requests() -> u32 {
    unsafe { (*simulation()).completed }
}
#[unsafe(no_mangle)]
pub extern "C" fn cache_hits() -> u32 {
    unsafe { (*simulation()).hits }
}
#[unsafe(no_mangle)]
pub extern "C" fn cache_misses() -> u32 {
    unsafe { (*simulation()).misses }
}
#[unsafe(no_mangle)]
pub extern "C" fn retry_count() -> u32 {
    unsafe { (*simulation()).retries }
}
#[unsafe(no_mangle)]
pub extern "C" fn dropped_requests() -> u32 {
    unsafe { (*simulation()).dropped }
}
#[unsafe(no_mangle)]
pub extern "C" fn ticks_elapsed() -> u32 {
    unsafe { (*simulation()).tick }
}
