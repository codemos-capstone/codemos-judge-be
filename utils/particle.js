import { GRAVITY, LAND_MAX_FRAME } from "./helpers/constants.js";
import { randomBool } from "./helpers/helpers.js";

export const makeParticle = (
  state,
  startPosition,
  startVelocity,
  width,
  height,
  fill,
  customDraw = false,
  useTerrain = true,
  onCollide = () => {}
) => {
  const CTX = state.get("CTX");
  const scaleFactor = state.get("scaleFactor");
  const terrain = state.get("terrain");
  const landingData = state.get("terrain").getLandingData();
  const friction = 0.3;
  const rotationDirection = randomBool();

  let position = { ...startPosition };
  let positionLog = [];
  let velocity = { ...startVelocity };
  let rotationAngle = Math.PI * 2;
  let rotationVelocity = 0;
  let headingDeg = Math.atan2(velocity.y, velocity.x) * (180 / Math.PI);
  let frameCount = 0;

  const update = () => {
    velocity.x = startVelocity.x + Math.cos((headingDeg * Math.PI) / 180);
    velocity.y += GRAVITY;
    rotationVelocity += rotationDirection
      ? 0.1
      : -0.1;
    rotationAngle = (rotationAngle + rotationVelocity) * friction;

    let prospectiveNextPosition = {
      x: position.x + velocity.x,
      y: position.y + velocity.y,
    };

    if (useTerrain && prospectiveNextPosition.y >= landingData.terrainHeight) {
      const collisionPoint = isShapeInPath(
        CTX,
        scaleFactor,
        landingData.terrainPath2D,
        prospectiveNextPosition.x,
        prospectiveNextPosition.y,
        width,
        height
      );

      if (collisionPoint) {
        const collisionAngle = terrain.getSegmentAngleAtX(collisionPoint.x);

        if (Math.abs(collisionAngle) > 20) {
          headingDeg = angleReflect(headingDeg, collisionAngle);
        }

        velocity.x = velocity.x * -friction;
        velocity.y = velocity.y * -friction;

        prospectiveNextPosition = {
          x: position.x + velocity.x,
          y: position.y + velocity.y,
        };

        // Provide the point just prior to collision so particles reflect off
        // terrain rather than getting stuck in it
        onCollide(position, velocity);
      }

      // Track the last 20 positions to check for duplicates
      positionLog.push({ ...position });
      if (positionLog.length > 20) positionLog.shift();
    } else {
      positionLog = [];
    }

    position.x =
      position.x > state.get("canvasWidth")
        ? 0
        : position.x < 0
        ? state.get("canvasWidth")
        : prospectiveNextPosition.x;
    position.y = prospectiveNextPosition.y;
  };

  const draw = () => {
    if (frameCount < LAND_MAX_FRAME) update();

    CTX.save();

    if (customDraw) {
      customDraw(
        CTX,
        position,
        velocity,
        rotationAngle,
        fill,
        rotationVelocity
      );
    } else {
      CTX.fillStyle = fill;
      CTX.translate(position.x, position.y);
      CTX.rotate(rotationAngle);
      CTX.fillRect(-width / 2, -height / 2, width, height);
    }

    CTX.restore();

    frameCount++;
  };

  return { draw, getPosition: () => position, getVelocity: () => velocity };
};

function angleReflect(incidenceAngle, surfaceAngle) {
  const a = surfaceAngle * 2 - incidenceAngle;
  return a >= 360 ? a - 360 : a < 0 ? a + 360 : a;
}

function countSimilarCoordinates(arr) {
  return (
    arr.length -
    new Set(arr.map(({ x, y }) => `${Math.round(x)}|${Math.round(y)}`)).size
  );
}

function isShapeInPath(
  CTX,
  scaleFactor,
  path,
  topLeftX,
  topLeftY,
  width,
  height
) {
  const radius = Math.sqrt(width ** 2 + height ** 2) / 3;
  const numCollisionPoints = 5;
  const dots = new Array(numCollisionPoints).fill().map((_, i) => {
    const angle = (360 / numCollisionPoints) * i;
    return {
      x: topLeftX + radius * Math.cos((angle * Math.PI) / 180),
      y: topLeftY + radius * Math.sin((angle * Math.PI) / 180),
    };
  });

  return dots.find(({ x, y }) =>
    CTX.isPointInPath(path, x * scaleFactor, y * scaleFactor)
  );
}
