"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/hooks/useLocale";
import styles from "./GarbageCollector.module.css";

type SystemExports = {
  new_scene: () => void;
  tick: () => void;
  trigger_traffic_spike: (duration: number, intensity: number) => void;
  fail_node: (node: number, duration: number) => void;
  packet_capacity: () => number;
  packet_active: (index: number) => number;
  packet_stage: (index: number) => number;
  packet_progress: (index: number) => number;
  packet_status: (index: number) => number;
  packet_worker: (index: number) => number;
  queue_length: () => number;
  worker_state: (index: number) => number;
  node_state: (node: number) => number;
  total_requests: () => number;
  completed_requests: () => number;
  cache_hits: () => number;
  cache_misses: () => number;
  retry_count: () => number;
};

type Point = { x: number; y: number };
type NodeLayout = Point & { id: number; key: NodeKey };
type NodeKey = "client" | "gateway" | "queue" | "worker" | "cache" | "database" | "response";

const HEIGHT = 190;
const FRAME_DURATION = 1000 / 60;

function getLayout(width: number): NodeLayout[] {
  const compact = width < 420;
  const margin = compact ? 9 : width < 520 ? 22 : 34;
  return [
    { id: -1, key: "client", x: margin, y: 95 },
    { id: 0, key: "gateway", x: compact ? width * 0.14 : width * 0.15, y: 95 },
    { id: 1, key: "queue", x: compact ? width * 0.3 : width * 0.3, y: 95 },
    { id: 2, key: "worker", x: compact ? width * 0.48 : width * 0.47, y: 47 },
    { id: 3, key: "worker", x: compact ? width * 0.48 : width * 0.47, y: 95 },
    { id: 4, key: "worker", x: compact ? width * 0.48 : width * 0.47, y: 143 },
    { id: 5, key: "cache", x: compact ? width * 0.68 : width * 0.65, y: 61 },
    { id: 6, key: "database", x: compact ? width * 0.68 : width * 0.65, y: 129 },
    { id: 7, key: "response", x: width - margin, y: 95 },
  ];
}

function pointOnLine(from: Point, to: Point, progress: number): Point {
  return { x: from.x + (to.x - from.x) * progress, y: from.y + (to.y - from.y) * progress };
}

function getPacketPoint(system: SystemExports, slot: number, layout: NodeLayout[]): Point {
  const stage = system.packet_stage(slot);
  const progress = Math.max(0, Math.min(1, system.packet_progress(slot) / 1000));
  const client = layout[0];
  const gateway = layout[1];
  const queue = layout[2];
  const workerIndex = Math.max(0, Math.min(2, system.packet_worker(slot)));
  const worker = layout[3 + workerIndex];
  const cache = layout[6];
  const database = layout[7];
  const response = layout[8];

  if (stage === 1) return pointOnLine(client, gateway, progress);
  if (stage === 2) return { x: queue.x - 8 + (slot % 5) * 4, y: queue.y };
  if (stage === 3) return pointOnLine(queue, worker, progress);
  if (stage === 4) return pointOnLine(worker, cache, progress);
  if (stage === 5) return pointOnLine(cache, database, progress);
  if (stage === 6) {
    const origin = system.packet_status(slot) === 1 ? cache : database;
    return pointOnLine(origin, response, progress);
  }
  return client;
}

function line(context: CanvasRenderingContext2D, from: Point, to: Point, color: string, dash: number[] = []) {
  context.beginPath();
  context.setLineDash(dash);
  context.moveTo(Math.round(from.x) + 0.5, Math.round(from.y) + 0.5);
  context.lineTo(Math.round(to.x) + 0.5, Math.round(to.y) + 0.5);
  context.strokeStyle = color;
  context.lineWidth = 1;
  context.stroke();
  context.setLineDash([]);
}

function drawNode(
  context: CanvasRenderingContext2D,
  node: NodeLayout,
  state: number,
  hovered: boolean,
  colors: Record<string, string>,
  label: string,
  compact: boolean,
) {
  const color = state === 2 ? colors.error : hovered ? colors.accent : colors.node;
  context.strokeStyle = color;
  context.fillStyle = colors.background;
  context.lineWidth = hovered ? 1.5 : 1;

  if (node.key === "client" || node.key === "response") {
    const direction = node.key === "client" ? 1 : -1;
    context.beginPath();
    context.moveTo(node.x - direction * 6, node.y - 6);
    context.lineTo(node.x + direction * 2, node.y);
    context.lineTo(node.x - direction * 6, node.y + 6);
    context.stroke();
  } else if (node.key === "gateway") {
    context.beginPath();
    context.moveTo(node.x, node.y - 12);
    context.lineTo(node.x + 12, node.y);
    context.lineTo(node.x, node.y + 12);
    context.lineTo(node.x - 12, node.y);
    context.closePath();
    context.fill();
    context.stroke();
  } else if (node.key === "queue") {
    context.strokeRect(Math.round(node.x - 16) + 0.5, Math.round(node.y - 9) + 0.5, 32, 18);
    for (let index = 0; index < 3; index += 1) {
      context.fillStyle = index === 0 && state === 1 ? colors.accent : colors.muted;
      context.fillRect(Math.round(node.x - 10 + index * 8), Math.round(node.y - 2), 3, 3);
    }
  } else if (node.key === "worker") {
    context.strokeRect(Math.round(node.x - 15) + 0.5, Math.round(node.y - 9) + 0.5, 30, 18);
    if (state === 1) {
      context.fillStyle = colors.accent;
      context.fillRect(Math.round(node.x - 10), Math.round(node.y + 5), 20, 1);
    }
  } else if (node.key === "cache") {
    context.strokeRect(Math.round(node.x - 16) + 0.5, Math.round(node.y - 8) + 0.5, 32, 16);
    line(context, { x: node.x - 11, y: node.y - 3 }, { x: node.x + 11, y: node.y - 3 }, color);
    line(context, { x: node.x - 11, y: node.y + 3 }, { x: node.x + 5, y: node.y + 3 }, color);
  } else {
    context.beginPath();
    context.ellipse(node.x, node.y - 7, 15, 4, 0, 0, Math.PI * 2);
    context.moveTo(node.x - 15, node.y - 7);
    context.lineTo(node.x - 15, node.y + 7);
    context.ellipse(node.x, node.y + 7, 15, 4, 0, 0, Math.PI);
    context.lineTo(node.x + 15, node.y - 7);
    context.stroke();
  }

  const hideLabel = compact && (node.key === "client" || node.key === "response");
  if (!hideLabel) {
    context.fillStyle = hovered ? colors.text : colors.label;
    context.font = `${compact ? 8 : 9}px var(--font-geist-mono), monospace`;
    context.textAlign = "center";
    context.textBaseline = "top";
    context.fillText(label, Math.round(node.x), Math.round(node.y + (node.key === "gateway" ? 17 : 14)));
  }
}

export default function SystemInMotion() {
  const { t } = useLocale();
  const { resolvedTheme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const systemRef = useRef<SystemExports | null>(null);
  const animationRef = useRef<number | null>(null);
  const hoveredRef = useRef<number | null>(null);
  const reducedMotionRef = useRef(false);
  const [ready, setReady] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let active = true;
    let hasStarted = false;
    let previousTime = 0;
    let accumulator = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    reducedMotionRef.current = reducedMotion;
    const dark = resolvedTheme !== "light";
    const colors = dark
      ? { background: "#0c0f11", line: "#27303a", node: "#9ca3af", label: "#6b7280", text: "#d1d5db", muted: "#4b5563", accent: "#60a5fa", success: "#4ade80", warning: "#fbbf24", error: "#f87171" }
      : { background: "#ffffff", line: "#d1d5db", node: "#6b7280", label: "#9ca3af", text: "#374151", muted: "#d1d5db", accent: "#3b82f6", success: "#16a34a", warning: "#d97706", error: "#dc2626" };
    const labels: Record<NodeKey, string> = {
      client: t("scene.client"), gateway: t("scene.gateway"), queue: t("scene.queue"), worker: t("scene.worker"),
      cache: t("scene.cache"), database: t("scene.database"), response: t("scene.response"),
    };

    const render = (time: number) => {
      if (!active) return;
      const system = systemRef.current;
      const context = canvas.getContext("2d");
      const width = Math.max(1, Math.round(canvas.clientWidth));
      const ratio = window.devicePixelRatio || 1;
      if (canvas.width !== Math.round(width * ratio) || canvas.height !== Math.round(HEIGHT * ratio)) {
        canvas.width = Math.round(width * ratio);
        canvas.height = Math.round(HEIGHT * ratio);
      }
      context?.setTransform(ratio, 0, 0, ratio, 0, 0);

      if (system && context) {
        if (!hasStarted && reducedMotion) for (let index = 0; index < 150; index += 1) system.tick();
        if (reducedMotion) {
          if (previousTime === 0) previousTime = time;
          if (time - previousTime >= 1000) {
            for (let index = 0; index < 60; index += 1) system.tick();
            previousTime = time;
          }
        } else {
          if (previousTime === 0) previousTime = time;
          accumulator += Math.min(time - previousTime, 50);
          previousTime = time;
          while (accumulator >= FRAME_DURATION) {
            system.tick();
            accumulator -= FRAME_DURATION;
          }
        }

        const layout = getLayout(width);
        const compact = width < 560;
        const hovered = hoveredRef.current;
        context.clearRect(0, 0, width, HEIGHT);
        context.fillStyle = colors.background;
        context.fillRect(0, 0, width, HEIGHT);

        line(context, layout[0], layout[1], colors.line);
        line(context, layout[1], layout[2], colors.line);
        for (const worker of layout.slice(3, 6)) line(context, layout[2], worker, colors.line);
        for (const worker of layout.slice(3, 6)) line(context, worker, layout[6], colors.line);
        line(context, layout[6], layout[7], colors.line, [2, 3]);
        line(context, layout[6], layout[8], colors.line);
        line(context, layout[7], layout[8], colors.line);

        for (let index = 0; index < system.packet_capacity(); index += 1) {
          if (!system.packet_active(index)) continue;
          const point = getPacketPoint(system, index, layout);
          const status = system.packet_status(index);
          context.fillStyle = status === 3 ? colors.warning : status === 4 ? colors.error : status === 1 ? colors.success : colors.accent;
          context.fillRect(Math.round(point.x - 1.5), Math.round(point.y - 1.5), 3, 3);
        }

        layout.forEach((node, index) => {
          const state = node.key === "client" ? 0 : node.key === "worker" ? system.worker_state(index - 3) : system.node_state(node.id);
          const workerSuffix = node.key === "worker" ? ` ${index - 2}` : "";
          drawNode(context, node, state, hovered === index, colors, labels[node.key] + workerSuffix, compact);
        });

        if (hovered !== null) {
          const node = layout[hovered];
          let detail = system.node_state(node.id) === 2 ? t("scene.recovering") : t("scene.healthy");
          if (node.key === "queue") detail = `${system.queue_length()} ${t("scene.queued")}`;
          if (node.key === "gateway" || node.key === "client") detail = `${system.total_requests()} ${t("scene.requests")}`;
          if (node.key === "response") detail = `${system.completed_requests()} ${t("scene.requests")}`;
          if (node.key === "cache") detail = `${system.cache_hits()} ${t("scene.cacheHits")} · ${system.cache_misses()} ${t("scene.cacheMisses")}`;
          if (node.key === "worker") detail = system.worker_state(hovered - 3) === 1 ? t("scene.processing") : detail;

          context.font = "9px var(--font-geist-mono), monospace";
          const tooltipWidth = Math.max(72, Math.ceil(context.measureText(detail).width) + 16);
          const tooltipX = Math.max(6, Math.min(width - tooltipWidth - 6, node.x - tooltipWidth / 2));
          const tooltipY = node.y > 105 ? 8 : 164;
          context.fillStyle = colors.background;
          context.fillRect(Math.round(tooltipX), tooltipY, tooltipWidth, 18);
          context.strokeStyle = colors.line;
          context.strokeRect(Math.round(tooltipX) + 0.5, tooltipY + 0.5, tooltipWidth - 1, 17);
          context.fillStyle = colors.text;
          context.textAlign = "center";
          context.textBaseline = "middle";
          context.fillText(detail, Math.round(tooltipX + tooltipWidth / 2), tooltipY + 9);
        }

        if (!hasStarted) {
          hasStarted = true;
          setReady(true);
        }
      }
      animationRef.current = requestAnimationFrame(render);
    };

    WebAssembly.instantiateStreaming(fetch("/game/portfolio_game.wasm"), {})
      .catch(async () => WebAssembly.instantiate(await (await fetch("/game/portfolio_game.wasm")).arrayBuffer(), {}))
      .then(({ instance }) => {
        if (!active) return;
        systemRef.current = instance.exports as unknown as SystemExports;
        systemRef.current.new_scene();
      })
      .catch(() => active && setUnavailable(true));
    animationRef.current = requestAnimationFrame(render);

    return () => {
      active = false;
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [resolvedTheme, t]);

  const nodeAtPointer = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const layout = getLayout(rect.width);
    const radius = rect.width < 420 ? 16 : 24;
    const index = layout.findIndex((node) => Math.hypot(node.x - x, node.y - y) <= radius);
    return index >= 0 ? index : null;
  };

  const interact = (clientX?: number, clientY?: number) => {
    const system = systemRef.current;
    if (!system) return;
    const hovered = clientX === undefined || clientY === undefined ? null : nodeAtPointer(clientX, clientY);
    if (hovered !== null) {
      const node = getLayout(canvasRef.current?.clientWidth ?? 0)[hovered];
      if (node.id < 0) system.trigger_traffic_spike(180, 4);
      else system.fail_node(node.id, 150);
    } else {
      system.trigger_traffic_spike(180, 4);
    }
    if (reducedMotionRef.current) for (let index = 0; index < 18; index += 1) system.tick();
  };

  return (
    <div className={styles.system}>
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        height={HEIGHT}
        role="button"
        tabIndex={0}
        aria-label={t("scene.ariaLabel")}
        aria-describedby="system-motion-hint"
        onPointerMove={(event) => {
          hoveredRef.current = nodeAtPointer(event.clientX, event.clientY);
          event.currentTarget.style.cursor = hoveredRef.current === null ? "crosshair" : "pointer";
        }}
        onPointerLeave={() => { hoveredRef.current = null; }}
        onClick={(event) => interact(event.clientX, event.clientY)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            interact();
          } else if (/^[1-8]$/.test(event.key)) {
            event.preventDefault();
            systemRef.current?.fail_node(Number(event.key) - 1, 150);
          }
        }}
      />
      <span id="system-motion-hint" className={styles.srOnly}>{t("scene.hint")}</span>
      {!ready && <div className={styles.loading}>{unavailable ? t("scene.unavailable") : t("scene.loading")}</div>}
    </div>
  );
}
