import Result1 from './result1/result';

const result1Sources = {
  airplane: `./img/result1/airplane.png`,
  ice: `./img/result1/ice.png`,
  seaCalf: `./img/result1/sea-calf-2.png`,
  snowflake: `./img/result1/snowflake.png`,
  tree: `./img/result1/tree.png`,
  tree2: `./img/result1/tree 2.png`,
};
const canvas = document.querySelector(`#result-canvas`);
const runResult = (result, sources) => {
  result.setCanvasSize(1000, 1000);
  drawResultOnFullScreen(result);
  window.addEventListener(`resize`, () => drawResultOnFullScreen(result));

  result.loadImages(sources, (images) => {
    result.createObjects(images, canvas);
    result.startRender();
    result.startAnimation();
  });
};
const drawResultOnFullScreen = (result) => {
  result.setScaleCanvas(Math.max(window.innerWidth, window.innerHeight));
  result.setCanvasToCenter(window.innerWidth, window.innerHeight);
};

export default () => {
  let showResultEls = document.querySelectorAll(`.js-show-result`);
  let results = document.querySelectorAll(`.screen--result`);
  let resultAnimation;
  let images;

  if (results.length) {
    for (let i = 0; i < showResultEls.length; i++) {
      showResultEls[i].addEventListener(`click`, function () {
        let target = showResultEls[i].getAttribute(`data-target`);
        [].slice.call(results).forEach(function (el) {
          el.classList.remove(`screen--show`);
          el.classList.add(`screen--hidden`);
        });
        let targetEl = [].slice.call(results).filter(function (el) {
          return el.getAttribute(`id`) === target;
        });
        // targetEl[0].classList.add(`screen--show`);
        // targetEl[0].classList.remove(`screen--hidden`);

        this.style.pointerEvents = `none`;
        switch (i) {
          case 0:
            images = result1Sources;
            resultAnimation = new Result1(canvas);
            break;

          default:
            break;
        }


        if (resultAnimation) {
          runResult(resultAnimation, images);
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
