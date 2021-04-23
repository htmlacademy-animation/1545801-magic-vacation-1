import Swiper from "swiper";

export default () => {
  let storySlider;
  let sceneId = 1;
  const slidesMap = {
    0: 1,
    1: 1,
    2: 2,
    3: 2,
    4: 3,
    5: 3,
    6: 4,
    7: 4,
  };
  const storyScreen = document.querySelector(`#story`);
  const emitChangeDisplayEvent = () => {
    const event = new CustomEvent(`screenChanged`, {
      detail: {
        'screenId': 1,
        'screenName': storyScreen.id,
        'screenElement': storyScreen,
        'sceneId': sceneId
      }
    });

    document.body.dispatchEvent(event);
  };

  const setSlider = function () {
    if (((window.innerWidth / window.innerHeight) < 1) || window.innerWidth < 769) {
      storySlider = new Swiper(`.js-slider`, {
        pagination: {
          el: `.swiper-pagination`,
          type: `bullets`
        },
        keyboard: {
          enabled: true
        },
        on: {
          slideChange: () => {
            sceneId = slidesMap[storySlider.activeIndex];
            storyScreen.activeSlide = sceneId;
            emitChangeDisplayEvent();
          },
          resize: () => {
            storySlider.update();
          }
        },
        observer: true,
        observeParents: true
      });
    } else {
      storySlider = new Swiper(`.js-slider`, {
        slidesPerView: 2,
        slidesPerGroup: 2,
        pagination: {
          el: `.swiper-pagination`,
          type: `fraction`
        },
        navigation: {
          nextEl: `.js-control-next`,
          prevEl: `.js-control-prev`,
        },
        keyboard: {
          enabled: true
        },
        on: {
          slideChange: () => {
            sceneId = slidesMap[storySlider.activeIndex];
            storyScreen.activeSlide = sceneId;
            emitChangeDisplayEvent();
          },
          resize: () => {
            storySlider.update();
          }
        },
        observer: true,
        observeParents: true
      });
    }
  };

  window.addEventListener(`resize`, function () {
    if (storySlider) {
      storySlider.destroy();
    }
    setSlider();
  });

  storyScreen.activeSlide = slidesMap[sceneId];
  emitChangeDisplayEvent();
  setSlider();

};
