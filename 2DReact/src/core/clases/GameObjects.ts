import { Dom } from './Dom';

export class GameObjects {
  private dom = new Dom();

  // Hold the single instance
  private static instance: GameObjects;

  private objects: Map<
    string,
    {
      element: HTMLElement;
      pos: { x: number; y: number };
      moving?: 'left' | 'right' | 'idle';
      jumping?: {
        yEnd: number;
        isJumping: boolean;
        topReached: boolean;
      };
    }
  > = new Map(); // A set of game objects

  // Make constructor private to prevent direct instantiation
  private constructor() {}

  // Public method to get the singleton instance
  public static getInstance(): GameObjects {
    if (!GameObjects.instance) {
      GameObjects.instance = new GameObjects();
    }
    return GameObjects.instance;
  }

  /* =========================
     Public API
     ========================= */

  get(name: string) {
    return this.objects.get(name);
  }

  getPlatforms() {
    const platforms: Element[] = [];
    for (const [_, value] of this.objects.entries()) {
      const allPlatforms = this.dom.queryAll(
        '[data-isplatform]',
        value.element
      );
      if (allPlatforms.length > 0) {
        allPlatforms.forEach((platform) => platforms.push(platform));
      }
    }

    if (!platforms) return [];
    return platforms;
  }

  has(name: string) {
    return this.objects.has(name);
  }

  add({
    element,
    name,
    pos,
  }: {
    name: string;
    element: HTMLElement;
    pos: { x: number; y: number };
  }) {
    this.objects.set(name, {
      element,
      pos,
    });
    this.dom.setPosition({ element, pos });
  }

  addAll(
    all: {
      name: string;
      element: HTMLElement;
      pos: { x: number; y: number };
    }[]
  ) {
    all.forEach(({ name, element, pos }) => {
      this.add({ name, element, pos });
      this.dom.setPosition({ element, pos });
    });
  }

  setMovement(name: string, movement: 'left' | 'right' | 'idle') {
    const object = this.objects.get(name);
    if (object) object.moving = movement;
  }

  setJumping(name: string, isJumping: boolean, distance: number = 130) {
    const object = this.objects.get(name);
    if (object) {
      const end = object?.pos.y + distance;
      object.jumping = { yEnd: end, isJumping, topReached: false };
    }
  }

  remove(name: string) {
    this.objects.delete(name);
  }

  getObjects() {
    return this.objects;
  }

  clear() {
    this.objects.clear();
  }
}
