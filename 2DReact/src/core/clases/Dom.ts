export class Dom {
  constructor() {}

  setPosition({
    element,
    pos,
  }: {
    element: HTMLElement;
    pos: { x: number; y: number };
  }) {
    if (element) {
      element.style.left = `${pos.x}px`;
      element.style.bottom = `${pos.y}px`;
    }
  }

  queryAll(selector: string, element?: HTMLElement) {
    if (element) return element.querySelectorAll(selector);
    return document.querySelectorAll(selector);
  }

  getScreenHeight(): number {
    return (
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
    );
  }

  getRootBottom() {
    return document.getElementById('root')?.getBoundingClientRect().y;
  }

  getRootLeft() {
    return document.getElementById('root')?.getBoundingClientRect().x;
  }
}
