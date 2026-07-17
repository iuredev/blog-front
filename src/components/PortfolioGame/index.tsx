"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLocale } from "@/hooks/useLocale";
import { Project } from "@/types";
import styles from "./PortfolioGame.module.css";

type GameExports = { reset: () => void; move_player: (direction: number) => void; player_x: () => number; player_y: () => number; nearby_interaction: () => number };
type Props = { projects: Project[] };
const labels = { 1: "game.projects", 2: "game.notes", 3: "game.about", 4: "game.manual" } as const;
const descriptions = { 1: "game.projectsDescription", 2: "game.notesDescription", 3: "game.aboutDescription", 4: "game.manualDescription" } as const;

function drawCharacter(context: CanvasRenderingContext2D, x: number, y: number, facing: number, frame: number) {
  const left = Math.round(x) - 6;
  const top = Math.round(y) - 12;
  const walking = frame % 2;

  context.fillStyle = "rgba(0,0,0,.38)";
  context.fillRect(left - 1, top + 17, 14, 3);
  context.fillStyle = "#111827";
  context.fillRect(left + 2 - walking, top + 14, 4, 5);
  context.fillRect(left + 7 + walking, top + 14, 4, 5);
  context.fillStyle = "#2563eb";
  context.fillRect(left + 1, top + 7, 11, 8);
  context.fillStyle = "#60a5fa";
  context.fillRect(left + 1, top + 7, 2, 6);
  context.fillStyle = "#d6a477";
  context.fillRect(left + 3, top + 2, 8, 7);
  context.fillStyle = "#201b1a";
  context.fillRect(left + 3, top, 8, 3);
  context.fillRect(left + 2, top + 2, 2, 4);
  if (facing !== 0) {
    context.fillStyle = "#111827";
    if (facing === 1) context.fillRect(left + 9, top + 4, 2, 2);
    else if (facing === 3) context.fillRect(left + 3, top + 4, 2, 2);
    else {
      context.fillRect(left + 4, top + 4, 2, 2);
      context.fillRect(left + 8, top + 4, 2, 2);
    }
  }
}

export default function PortfolioGame({ projects }: Props) {
  const { t, localizeHref } = useLocale();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<GameExports | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const facingRef = useRef(2);
  const stepRef = useRef(0);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [interaction, setInteraction] = useState(0);
  const [open, setOpen] = useState(0);

  const draw = useCallback(() => {
    const game = gameRef.current, canvas = canvasRef.current, image = imageRef.current;
    if (!game || !canvas || !image?.complete) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.imageSmoothingEnabled = false;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    const currentInteraction = game.nearby_interaction();
    const x = game.player_x() / 1000 * canvas.width, y = game.player_y() / 1000 * canvas.height;
    drawCharacter(context, x, y, facingRef.current, stepRef.current);
    setInteraction(currentInteraction);
  }, []);

  useEffect(() => {
    let active = true;
    const image = new Image();
    image.src = "/game/portfolio-room-v2.png";
    image.onload = draw;
    imageRef.current = image;
    WebAssembly.instantiateStreaming(fetch("/game/portfolio_game.wasm"), {})
      .catch(async () => WebAssembly.instantiate(await (await fetch("/game/portfolio_game.wasm")).arrayBuffer(), {}))
      .then(({ instance }) => {
        if (!active) return;
        gameRef.current = instance.exports as unknown as GameExports;
        gameRef.current.reset(); setReady(true); requestAnimationFrame(draw);
      })
      .catch(() => active && setFailed(true));
    return () => { active = false; };
  }, [draw]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(0); };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, []);

  const move = useCallback((direction: number) => {
    facingRef.current = direction; stepRef.current += 1;
    gameRef.current?.move_player(direction); draw();
  }, [draw]);
  const reveal = useCallback((value: number) => {
    if (!value) return;
    setOpen(value);
  }, []);
  const interact = useCallback(() => reveal(gameRef.current?.nearby_interaction() ?? 0), [reveal]);
  const onKeyDown = (event: React.KeyboardEvent) => {
    const key = event.key.toLowerCase();
    const directions: Record<string, number> = { arrowup: 0, w: 0, arrowright: 1, d: 1, arrowdown: 2, s: 2, arrowleft: 3, a: 3 };
    if (key in directions) { event.preventDefault(); move(directions[key]); }
    if (key === "e" || key === "enter") { event.preventDefault(); interact(); }
  };
  const closeDialog = () => { setOpen(0); requestAnimationFrame(() => stageRef.current?.focus()); };
  const onStageClick = (event: React.MouseEvent<HTMLDivElement>) => {
    stageRef.current?.focus();
    if (event.target !== canvasRef.current) return;
    const bounds = stageRef.current?.getBoundingClientRect();
    if (!bounds) return;
    const x = (event.clientX - bounds.left) / bounds.width * 1000;
    const y = (event.clientY - bounds.top) / bounds.height * 1000;
    if (x < 440 && y < 380) reveal(1);
    else if (x > 660 && y < 440) reveal(2);
    else if (x < 270 && y > 500) reveal(3);
    else if (x > 670 && y > 590) reveal(4);
  };
  const linkFor = (value: number) => value === 2 ? "/notes" : value === 3 ? "/about" : "/manual";
  const labelKey = labels[open as keyof typeof labels] ?? "game.projects";
  const descriptionKey = descriptions[open as keyof typeof descriptions] ?? "game.projectsDescription";

  const modal = open > 0 ? <div className={styles.dialogBackdrop} role="presentation" onMouseDown={(event) => event.target === event.currentTarget && closeDialog()}>
    <section className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby="game-dialog-title">
      <div className={styles.dialogHeader}><span>~/room/{labelKey.replace("game.", "")}</span><button className={styles.close} onClick={closeDialog} aria-label={t("game.close")}>{t("game.close")}</button></div>
      <div className={styles.dialogBody}>
        <h3 id="game-dialog-title">{t(labelKey)}</h3><p>{t(descriptionKey)}</p>
        {open === 1 ? <div className={styles.dialogLinks}>
          {projects.length === 0
            ? <p className={styles.empty}>{t("projects.none")}</p>
            : projects.slice(0, 3).map((project) => <Link key={project.id} className={styles.dialogLink} href={project.slug ? localizeHref(`/projects/${project.slug}`) : project.link ?? localizeHref("/projects")} target={!project.slug && project.link ? "_blank" : undefined}><span>{project.title}</span><span>{project.slug || !project.link ? "→" : "↗"}</span></Link>)}
          <Link className={styles.dialogLink} href={localizeHref("/projects")} onClick={closeDialog}><span>{t("home.viewAllProjects")}</span><span>→</span></Link>
        </div> : <Link className={styles.dialogLink} href={localizeHref(linkFor(open))} onClick={closeDialog}><span>{t("game.openPage")}</span><span>→</span></Link>}
      </div>
    </section>
  </div> : null;

  return <>
    <div className={styles.frame}>
      <div className={styles.topbar}><span>iure_room.wasm</span><span className={styles.status}>{ready ? t("game.online") : t("game.loading")}</span></div>
      <div ref={stageRef} className={styles.stage} tabIndex={0} onKeyDown={onKeyDown} onClick={onStageClick} aria-label={t("game.ariaLabel")}>
        <canvas ref={canvasRef} className={styles.canvas} width="384" height="256" />
        {failed && <div className={styles.error}>{t("game.unavailable")}</div>}
        {!failed && interaction > 0 && <button className={styles.prompt} onClick={interact}>[ E ] {t(labels[interaction as keyof typeof labels])}</button>}
      </div>
      <div className={styles.controls} aria-label={t("game.touchControls")}>
        <button className={`${styles.control} ${styles.up}`} onClick={() => move(0)} aria-label={t("game.moveUp")}>↑</button>
        <button className={`${styles.control} ${styles.left}`} onClick={() => move(3)} aria-label={t("game.moveLeft")}>←</button>
        <button className={`${styles.control} ${styles.interact}`} onClick={interact} aria-label={t("game.interact")}>E</button>
        <button className={`${styles.control} ${styles.right}`} onClick={() => move(1)} aria-label={t("game.moveRight")}>→</button>
        <button className={`${styles.control} ${styles.down}`} onClick={() => move(2)} aria-label={t("game.moveDown")}>↓</button>
      </div>
      <div className={styles.help}>{t("game.instructions")}</div>
    </div>
    {typeof document !== "undefined" && modal ? createPortal(modal, document.body) : null}
  </>;
}
