import { Physics } from '../../core/clases/Physics';

export default function useGamePhysics() {
  const physics = new Physics();

  return {
    setGravityToObject: physics.setGravityToObject.bind(physics),
    isCollidingOnAnyElement: physics.isCollidingOnAnyElement.bind(physics),
    isCollidingScreenBottom: physics.isCollidingScreenBottom.bind(physics),
    isCollidingScreenLeft: physics.isCollidingScreenLeft.bind(physics),
    movingObjectLeft: physics.movingObjectLeft.bind(physics),
    movingObjectRight: physics.movingObjectRight.bind(physics),
    jump: physics.jump.bind(physics),
  };
}
