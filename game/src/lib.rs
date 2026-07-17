use std::sync::atomic::{AtomicI32, Ordering};

const MIN: i32 = 70;
const MAX: i32 = 930;
const STEP: i32 = 22;
const PLAYER_RADIUS: i32 = 18;

static PLAYER_X: AtomicI32 = AtomicI32::new(500);
static PLAYER_Y: AtomicI32 = AtomicI32::new(720);

#[unsafe(no_mangle)]
pub extern "C" fn reset() {
    PLAYER_X.store(500, Ordering::Relaxed);
    PLAYER_Y.store(720, Ordering::Relaxed);
}

#[unsafe(no_mangle)]
pub extern "C" fn move_player(direction: i32) {
    let (dx, dy) = match direction {
        0 => (0, -STEP), 1 => (STEP, 0), 2 => (0, STEP), 3 => (-STEP, 0), _ => (0, 0),
    };
    let current_x = player_x();
    let current_y = player_y();
    let next_x = (current_x + dx).clamp(MIN, MAX);
    let next_y = (current_y + dy).clamp(MIN, MAX);

    if !collides(next_x, next_y) {
        PLAYER_X.store(next_x, Ordering::Relaxed);
        PLAYER_Y.store(next_y, Ordering::Relaxed);
    }
}

#[unsafe(no_mangle)]
pub extern "C" fn player_x() -> i32 { PLAYER_X.load(Ordering::Relaxed) }

#[unsafe(no_mangle)]
pub extern "C" fn player_y() -> i32 { PLAYER_Y.load(Ordering::Relaxed) }

#[unsafe(no_mangle)]
pub extern "C" fn nearby_interaction() -> i32 {
    let (x, y) = (player_x(), player_y());
    let targets = [
        (1, 70, 420, 60, 350),
        (2, 690, 930, 70, 410),
        (3, 60, 245, 520, 900),
        (4, 700, 930, 620, 900),
    ];

    targets.into_iter()
        .filter_map(|(id, left, right, top, bottom)| {
            let nearest_x = x.clamp(left, right);
            let nearest_y = y.clamp(top, bottom);
            let distance = (x - nearest_x).pow(2) + (y - nearest_y).pow(2);
            (distance <= 95_i32.pow(2)).then_some((id, distance))
        })
        .min_by_key(|(_, distance)| *distance)
        .map(|(id, _)| id)
        .unwrap_or(0)
}

fn collides(x: i32, y: i32) -> bool {
    let furniture = [
        (55, 430, 45, 350),
        (680, 945, 55, 415),
        (45, 245, 515, 915),
        (690, 945, 610, 915),
    ];

    furniture.into_iter().any(|(left, right, top, bottom)| {
        x + PLAYER_RADIUS > left && x - PLAYER_RADIUS < right
            && y + PLAYER_RADIUS > top && y - PLAYER_RADIUS < bottom
    })
}
