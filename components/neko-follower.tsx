"use client";

import { useEffect } from "react";

const NEKO_WIDTH = 32;
const NEKO_HEIGHT = 32;
const NEKO_HALF_WIDTH = NEKO_WIDTH / 2;
const NEKO_HALF_HEIGHT = NEKO_HEIGHT / 2;
const NEKO_SPEED = 20;
const FRAME_RATE = 300;
const Z_INDEX = Number.MAX_SAFE_INTEGER;
const ALERT_TIME = 3;
const IDLE_THRESHOLD = 3;
const IDLE_ANIMATION_CHANCE = 1 / 20;
const MIN_DISTANCE = 10;
const SPRITE_GAP = 1;
const BACKGROUND_TARGET_COLOR: [number, number, number] = [0, 174, 240];

type SpriteSet = Record<string, [number, number][]>;

class Neko {
  private posX: number;
  private posY: number;
  private mouseX: number;
  private mouseY: number;
  private frameCount: number;
  private idleTime: number;
  private idleAnimation: string | null;
  private idleAnimationFrame: number;
  private alertTimeRemaining: number;
  private nekoElement: HTMLDivElement | null;
  private lastFrameTimestamp: number | null;
  private animationFrameId: number | null;
  private readonly isReducedMotion: boolean;
  private readonly nekoImageUrl: string;
  private readonly nekoName: string;
  private readonly spriteSets: SpriteSet;

  constructor({ nekoName, nekoImageUrl }: { nekoName: string; nekoImageUrl: string }) {
    const margin = 16;

    this.nekoName = nekoName;
    this.nekoImageUrl = nekoImageUrl;
    this.posX = Math.max(NEKO_HALF_WIDTH, window.innerWidth - NEKO_HALF_WIDTH - margin);
    this.posY = Math.max(NEKO_HALF_HEIGHT, window.innerHeight - NEKO_HALF_HEIGHT - margin);
    this.mouseX = this.posX;
    this.mouseY = this.posY;
    this.frameCount = 0;
    this.idleTime = 0;
    this.idleAnimation = null;
    this.idleAnimationFrame = 0;
    this.alertTimeRemaining = 0;
    this.nekoElement = null;
    this.lastFrameTimestamp = null;
    this.animationFrameId = null;
    this.isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    this.spriteSets = {
      idle: [[0, 0]],
      alert: [[7, 0]],
      lickPaw: [[1, 0]],
      scratchSelf: [
        [2, 0],
        [3, 0],
      ],
      tired: [[4, 0]],
      sleeping: [
        [5, 0],
        [6, 0],
      ],
      S: [
        [0, 1],
        [1, 1],
      ],
      SE: [
        [2, 1],
        [3, 1],
      ],
      E: [
        [4, 1],
        [5, 1],
      ],
      NE: [
        [6, 1],
        [7, 1],
      ],
      N: [
        [0, 2],
        [1, 2],
      ],
      NW: [
        [2, 2],
        [3, 2],
      ],
      W: [
        [4, 2],
        [5, 2],
      ],
      SW: [
        [6, 2],
        [7, 2],
      ],
    };
  }

  init() {
    if (this.isReducedMotion) return;
    if (document.getElementById(this.nekoName)) return;

    void this.createNekoElement();
    this.addEventListeners();
    this.animationLoop();
  }

  static async makeTransparent(
    imageUrl: string,
    targetColor: [number, number, number],
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = imageUrl;
      img.crossOrigin = "Anonymous";

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          reject(new Error("Canvas not supported"));
          return;
        }

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
          if (
            data[i] === targetColor[0] &&
            data[i + 1] === targetColor[1] &&
            data[i + 2] === targetColor[2]
          ) {
            data[i + 3] = 0;
          }
        }

        ctx.putImageData(imageData, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      };

      img.onerror = () => reject(new Error("Image load failed"));
    });
  }

  private async createNekoElement() {
    const element = document.createElement("div");

    element.id = this.nekoName;
    element.ariaHidden = "true";
    element.style.width = `${NEKO_WIDTH}px`;
    element.style.height = `${NEKO_HEIGHT}px`;
    element.style.position = "fixed";
    element.style.pointerEvents = "none";
    element.style.imageRendering = "pixelated";
    element.style.left = `${this.posX - NEKO_HALF_WIDTH}px`;
    element.style.top = `${this.posY - NEKO_HALF_HEIGHT}px`;
    element.style.zIndex = Z_INDEX.toString();
    element.style.backgroundImage = `url("${this.nekoImageUrl}")`;

    try {
      const transparentImageUrl = await Neko.makeTransparent(
        this.nekoImageUrl,
        BACKGROUND_TARGET_COLOR,
      );
      element.style.backgroundImage = `url("${transparentImageUrl}")`;
    } catch (error) {
      console.error("Neko image process failed", error);
    }

    this.nekoElement = element;
    document.body.appendChild(element);
    this.setSprite("idle", 0);
    this.render();
  }

  private handleMouseMove = (event: MouseEvent) => {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  };

  private handleResize = () => {
    this.clampToViewport();
    this.render();
  };

  private addEventListeners() {
    document.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("resize", this.handleResize);
  }

  private animationLoop() {
    const loop = (timestamp: number) => {
      if (this.lastFrameTimestamp === null) {
        this.lastFrameTimestamp = timestamp;
      }

      const delta = timestamp - this.lastFrameTimestamp;
      if (delta > FRAME_RATE) {
        this.lastFrameTimestamp = timestamp;
        this.updateState();
        this.render();
      }

      this.animationFrameId = window.requestAnimationFrame(loop);
    };

    this.animationFrameId = window.requestAnimationFrame(loop);
  }

  private updateState() {
    this.frameCount += 1;
    this.followMouse();
  }

  private followMouse() {
    const diffX = this.posX - this.mouseX;
    const diffY = this.posY - this.mouseY;
    const distance = Math.hypot(diffX, diffY);

    if (distance < MIN_DISTANCE) {
      this.idleBehavior();
      return;
    }

    if (this.idleTime > IDLE_THRESHOLD && this.alertTimeRemaining === 0) {
      this.alertTimeRemaining = ALERT_TIME;
    }

    if (this.alertTimeRemaining > 0) {
      this.setSprite("alert", 0);
      this.alertTimeRemaining -= 1;
      this.idleTime = 0;
      return;
    }

    this.idleTime = 0;
    this.idleAnimation = null;
    this.idleAnimationFrame = 0;

    let direction = "";
    direction += diffY / distance > 0.5 ? "N" : "";
    direction += diffY / distance < -0.5 ? "S" : "";
    direction += diffX / distance > 0.5 ? "W" : "";
    direction += diffX / distance < -0.5 ? "E" : "";
    this.setSprite(direction || "idle", this.frameCount);

    const step = Math.min(NEKO_SPEED, distance);
    this.posX -= (diffX / distance) * step;
    this.posY -= (diffY / distance) * step;
    this.clampToViewport();
  }

  private idleBehavior() {
    this.idleTime += 1;

    if (
      this.idleTime > IDLE_THRESHOLD &&
      Math.random() < IDLE_ANIMATION_CHANCE &&
      this.idleAnimation === null
    ) {
      const options = ["sleeping", "scratchSelf", "lickPaw"] as const;
      this.idleAnimation = options[Math.floor(Math.random() * options.length)] ?? null;
      this.idleAnimationFrame = 0;
    }

    switch (this.idleAnimation) {
      case "sleeping":
        if (this.idleAnimationFrame < 8) {
          this.setSprite("tired", 0);
        } else if (this.idleAnimationFrame < 16) {
          this.setSprite("idle", 0);
        } else {
          this.setSprite("sleeping", Math.floor(this.idleAnimationFrame / 4));
        }
        if (this.idleAnimationFrame > 64) {
          this.resetIdleAnimation();
        }
        break;
      case "lickPaw":
      case "scratchSelf":
        this.setSprite(this.idleAnimation, this.idleAnimationFrame);
        if (this.idleAnimationFrame > 8) {
          this.resetIdleAnimation();
        }
        break;
      default:
        this.setSprite("idle", 0);
        break;
    }

    this.idleAnimationFrame += 1;
  }

  private resetIdleAnimation() {
    this.idleAnimation = null;
    this.idleAnimationFrame = 0;
  }

  private clampToViewport() {
    this.posX = Math.min(
      Math.max(NEKO_HALF_WIDTH, this.posX),
      window.innerWidth - NEKO_HALF_WIDTH,
    );
    this.posY = Math.min(
      Math.max(NEKO_HALF_HEIGHT, this.posY),
      window.innerHeight - NEKO_HALF_HEIGHT,
    );
  }

  private render() {
    if (!this.nekoElement) return;
    this.nekoElement.style.left = `${this.posX - NEKO_HALF_WIDTH}px`;
    this.nekoElement.style.top = `${this.posY - NEKO_HALF_HEIGHT}px`;
  }

  private setSprite(name: string, frame: number) {
    if (!this.nekoElement) return;
    const spriteSet = this.spriteSets[name];
    if (!spriteSet || spriteSet.length === 0) return;

    const sprite = spriteSet[frame % spriteSet.length];
    if (!sprite) return;

    const posX = sprite[0] * (NEKO_WIDTH + SPRITE_GAP);
    const posY = sprite[1] * (NEKO_HEIGHT + SPRITE_GAP);
    this.nekoElement.style.backgroundPosition = `-${posX}px -${posY}px`;
  }

  destroy() {
    if (this.animationFrameId !== null) {
      window.cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    document.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("resize", this.handleResize);

    if (this.nekoElement) {
      this.nekoElement.remove();
      this.nekoElement = null;
    }
  }
}

export function NekoFollower() {
  useEffect(() => {
    const neko = new Neko({
      nekoName: "fire-neko",
      nekoImageUrl: "/cat/fire.png",
    });

    neko.init();
    return () => neko.destroy();
  }, []);

  return null;
}

