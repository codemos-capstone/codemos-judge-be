import {
  randomBetween,
  mirroredLoopingProgress,
  jitterCoordinate,
  transition,
  clampedProgress,
  easeInExpo,
} from "../helpers/helpers.js";
import { makeParticle } from "../particle.js";

export const makeConfetti = (state, amount, passedPosition, passedVelocity) => {
  const CTX = state.get("CTX");
  const canvasWidth = state.get("canvasWidth");
  const canvasHeight = state.get("canvasHeight");
  const confettiTypeAmount = Math.round(amount / 2);
  const timeOfInit = Date.now();
  const visibilityDuration = 5000;
  let drawLast = 100;

  const _startingPosition = (index) =>
    passedPosition
      ? passedPosition
      : {
          x: canvasWidth / 2 + index - confettiTypeAmount / 2,
          y: canvasHeight / 2,
        };

  const _startingVelocity = (index) =>
    passedVelocity
      ? {
          x:
            index < confettiTypeAmount / 2
              ? passedVelocity.x - 1
              : passedVelocity.x + 1,
          y: passedVelocity.y - 0.6,
        }
      : {
          x: index < confettiTypeAmount / 2 ? -0.7 : 0.7,
          y: -1,
        };

  const confettiPieces = new Array(confettiTypeAmount)
    .fill()
    .map((_, index) => {
      const size = randomBetween(1, 6);
      return makeParticle(
        state,
        jitterCoordinate(_startingPosition(index)),
        jitterCoordinate(_startingVelocity(index)),
        size,
        size,
        `hsl(${randomBetween(0, 360)}, 100%, 50%)`,
        false,
        false
      );
    });

  const twirlPieces = new Array(confettiTypeAmount).fill().map((_, index) => {
    const size = randomBetween(4, 8);
    return makeParticle(
      state,
      jitterCoordinate(_startingPosition(index)),
      jitterCoordinate(_startingVelocity(index)),
      size,
      size,
      `hsl(${randomBetween(0, 360)}, 100%, 50%)`,
      (CTX, position, __, _, fill, rotationVelocity) => {
        const twirlWidth =
          mirroredLoopingProgress(0, 3, Math.abs(rotationVelocity)) * size;
        CTX.fillStyle = fill;
        CTX.translate(position.x, position.y);
        CTX.beginPath();
        CTX.moveTo(-twirlWidth / 2, 0);
        CTX.lineTo(0, -size / 2);
        CTX.lineTo(twirlWidth / 2, 0);
        CTX.lineTo(0, size / 2);
        CTX.closePath();
        CTX.fill();
      },
      false
    );
  });

  const draw = () => {
    CTX.save();
    const animationProgress = clampedProgress(
      0,
      visibilityDuration,
      drawLast
    );
    CTX.globalAlpha = transition(1, 0, animationProgress, easeInExpo);
    confettiPieces.forEach((e) => e.draw());
    twirlPieces.forEach((e) => e.draw());
    CTX.restore();

    drawLast += 10;
  };

  return { draw };
};
