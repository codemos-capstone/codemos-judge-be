
import { logging, getVelocityX, getVelocityY, getAngle, getHeight, getRotationVelocity, engineOn, engineOff, rotateLeft, stopLeftRotation, rotateRight, stopRightRotation } from './index.js';

function removeComment(code) {
    return code
    .replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
}

function hasAsyncLoop(code) {
    const asyncLoopPatterns = [
      /setInterval\s*\(/,
      /setTimeout\s*\(/,
      /requestAnimationFrame\s*\(/,
      /process\.nextTick\s*\(/,
      /setImmediate\s*\(/
    ];

    for (const pattern of asyncLoopPatterns) {
      if (pattern.test(code)) {
        return true;
      }
    }

    return false;
}

var newInterval;
var isFirst = true;
export var _mainLoop;

/*
// TODO : 
_mainLoop = function() {
    // TODO : 
};
// TODO : 
*/

export function applyCode(userCode) {
    console.log(userCode);
    var code = removeComment(userCode); 

    if (!isFirst) clearInterval(newInterval);
    (function() {
        if (!hasAsyncLoop(code)) {
            eval(code);
            // newInterval = setInterval(() => {
            //     _mainLoop();
            // }, 1);
        } else {
            console.log("사용자 정의 비동기 루프 사용 금지, _mainLoop만 사용.");
        }
    })();
    isFirst = false;
}

window.applyCode = applyCode;