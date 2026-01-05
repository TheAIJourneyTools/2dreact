import { Dom } from './Dom';
import { GameObjects } from './GameObjects';

export class Physics {
  gameObjects = GameObjects.getInstance();
  private dom = new Dom();

  constructor() {}

  /* =========================
     Public API
     ========================= */
  setGravityToObject(name: string, gravity: number, stop = false) {
    const object = this.gameObjects.get(name);
    if (object) {
      if (!stop) object.pos.y += gravity;
      this.dom.setPosition({ element: object.element, pos: object.pos });
    } else {
      console.warn(`Object with key ${name} not found, cannot set gravity.`);
    }
  }

  movingObjectRight(name: string, velocity = 5) {
    const object = this.gameObjects.get(name);
    if (object) {
      object.pos.x += velocity;
      this.dom.setPosition({ element: object.element, pos: object.pos });
    }
  }

  movingObjectLeft(name: string, velocity = 5) {
    const object = this.gameObjects.get(name);
    if (object) {
      object.pos.x -= velocity;
      this.dom.setPosition({ element: object.element, pos: object.pos });
    }
  }

  jump(name: string, isColliding: boolean, velocity = 10) {
    const object = this.gameObjects.get(name);
    if (!object || !object.jumping || !object.jumping.isJumping) return;

    if (object.pos.y === object.jumping?.yEnd) {
      object.jumping.topReached = true;
    }
    if (object.pos.y <= object.jumping?.yEnd && !object.jumping.topReached) {
      object.pos.y += velocity;
    }

    if (object.jumping.topReached && !isColliding) {
      object.pos.y -= velocity;
    }

    if (object.jumping.topReached && isColliding) {
      object.jumping.isJumping = false;
      object.jumping.topReached = false;
    }

    this.dom.setPosition({ element: object?.element, pos: object?.pos });
  }

  isCollidingOnAnyElement(
    name: string,
    elements: Element[] | NodeListOf<Element>,
    includeX = true
  ) {
    let elementColliding = null as Element | null;
    // Collision detection logic would go here
    const object = this.gameObjects.get(name);
    const isColliding = Array.from(elements).some((el) => {
      const rectEl = el.getBoundingClientRect();
      const rectObject = object?.element.getBoundingClientRect();
      if (!rectObject) return false;
      const onY = rectEl.top <= rectObject.bottom;
      if (onY) {
        elementColliding = el;
      }

      const onX =
        rectObject.left <= rectEl.right && rectObject.right >= rectEl.left;

      if (includeX) return onY && onX;
      return onY;
    });

    //Compensate
    if (
      object &&
      isColliding &&
      elementColliding &&
      elementColliding.getBoundingClientRect().top
    ) {
      const elPosY =
        this.dom.getScreenHeight() -
        elementColliding.getBoundingClientRect().top;
      const objPosY =
        this.dom.getScreenHeight() -
        object.element.getBoundingClientRect().bottom;
      if (elPosY !== objPosY) {
        object.pos.y = elPosY;
        this.dom.setPosition({ element: object.element, pos: object.pos });
      }
    }

    return isColliding;
  }

  isCollidingScreenBottom(name: string) {
    const object = this.gameObjects.get(name);
    if (!object) return false;
    const rootBottom = this.dom.getRootBottom() || 0;

    return object.pos.y <= rootBottom;
  }

  isCollidingScreenLeft(name: string) {
    const object = this.gameObjects.get(name);
    if (!object) return false;
    const rootLeft = this.dom.getRootLeft() || 0;

    return object.pos.x <= rootLeft;
  }
}
