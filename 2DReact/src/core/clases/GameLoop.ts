export type UpdateCallback = (dt: number) => void;
export type RenderCallback = (alpha: number) => void;

export class GameLoop {
  private running = false;
  private paused = false;

  private lastTime = 0;
  private accumulator = 0;
  private frameSinceStart = 0;

  private readonly timestep: number;
  private readonly maxFrameTime = 250; // ms

  private updateCallbacks = new Set<UpdateCallback>();
  private renderCallbacks = new Set<RenderCallback>();

  constructor(timestep = 1000 / 60) {
    this.timestep = timestep;
  }

  /* =========================
     Public API
     ========================= */

  start() {
    if (this.running) return;

    this.running = true;
    this.paused = false;
    this.lastTime = performance.now();
    requestAnimationFrame(this.loop);
  }

  stop() {
    this.running = false;
    this.accumulator = 0;
  }

  pause() {
    this.paused = true;
  }

  resume() {
    this.paused = false;
    this.lastTime = performance.now();
  }

  destroy() {
    this.stop();
    this.updateCallbacks.clear();
    this.renderCallbacks.clear();
  }

  onUpdate(cb: UpdateCallback) {
    this.updateCallbacks.add(cb);
    return () => this.updateCallbacks.delete(cb);
  }

  onRender(cb: RenderCallback) {
    this.renderCallbacks.add(cb);
    return () => this.renderCallbacks.delete(cb);
  }

  getFrameSinceStart() {
    return this.frameSinceStart;
  }

  /* =========================
     Internal loop
     ========================= */

  private loop = (time: number) => {
    if (!this.running) return;
    this.frameSinceStart++;

    let delta = time - this.lastTime;
    this.lastTime = time;

    if (delta > this.maxFrameTime) {
      delta = this.maxFrameTime; // prevent spiral of death
    }

    if (!this.paused) {
      this.accumulator += delta;

      while (this.accumulator >= this.timestep) {
        this.update(this.timestep);
        this.accumulator -= this.timestep;
      }
    }

    const alpha = this.accumulator / this.timestep;
    this.render(alpha);

    requestAnimationFrame(this.loop);
  };

  private update(dt: number) {
    for (const cb of this.updateCallbacks) {
      cb(dt);
    }
  }

  private render(alpha: number) {
    for (const cb of this.renderCallbacks) {
      cb(alpha);
    }
  }
}
