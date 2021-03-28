import Result1 from './result1/result';

export default () => {
  const canvases = document.querySelectorAll(`.result-canvas`);
  const canvasResults = {
    result: new Result1(canvases[0]),
    // result2: new Result1(canvases[1]),
    // result3: new Result1(canvases[2]),
  };
  let showResultEls = document.querySelectorAll(`.js-show-result`);
  let results = document.querySelectorAll(`.screen--result`);

  if (results.length) {
    for (let i = 0; i < showResultEls.length; i++) {
      showResultEls[i].addEventListener(`click`, function () {
        let target = showResultEls[i].getAttribute(`data-target`);
        [].slice.call(results).forEach(function (el) {
          const resultId = el.getAttribute(`id`);
          const result = canvasResults[resultId];

          el.classList.remove(`screen--show`);
          el.classList.add(`screen--hidden`);

          if (result && !result.isStoppedRender) {
            result.canvas.style.display = `none`;
            result.stopRender();
            result.clear();
            result.disableResize();
          }
        });
        let targetEl = [].slice.call(results).filter(function (el) {

          return el.getAttribute(`id`) === target;
        });
        let resultEl = targetEl[0];
        let resultId = resultEl.getAttribute(`id`);
        let title = resultEl.querySelector(`#${resultId}Title`);
        let canvasResult = canvasResults[resultId];

        resultEl.classList.add(`screen--show`);
        resultEl.classList.remove(`screen--hidden`);

        title.beginElement();

        if (canvasResult) {
          setTimeout(() => {
            if (!canvasResult.isInitialized) {
              canvasResult.isInitialized = true;
              canvasResult.init();
            } else {
              canvasResult.startRender();
            }
            canvasResult.resizeOnFullScreen();
            canvasResult.setCanvasToCenter();
            canvasResult.canvas.style.display = `block`;
          }, 300);
        }
      });
    }

    let playBtn = document.querySelector(`.js-play`);
    if (playBtn) {
      playBtn.addEventListener(`click`, function () {
        [].slice.call(results).forEach(function (el) {
          el.classList.remove(`screen--show`);
          el.classList.add(`screen--hidden`);
        });
        document.getElementById(`messages`).innerHTML = ``;
        document.getElementById(`message-field`).focus();
      });
    }
  }
};

let asd = false;
