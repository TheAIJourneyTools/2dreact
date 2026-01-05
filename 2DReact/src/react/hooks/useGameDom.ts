import { Dom } from '../../core/clases/Dom';

export default function useGameDom() {
  const dom = new Dom();

  return {
    getScreenHeight: dom.getScreenHeight.bind(dom),
  };
}
