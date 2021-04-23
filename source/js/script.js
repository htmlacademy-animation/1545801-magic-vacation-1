// modules
import mobileHeight from './modules/mobile-height-adjust.js';
import slider from './modules/slider.js';
import menu from './modules/menu.js';
import footer from './modules/footer.js';
import chat from './modules/chat.js';
import result from './modules/result.js';
import form from './modules/form.js';
import social from './modules/social.js';
import rules from './modules/rules.js';
import FullPageScroll from './modules/full-page-scroll';
import Scene3D from './modules/3d-scene';

// init modules
mobileHeight();
slider();
menu();
footer();
chat();
result();
form();
social();
rules();

const canvas = document.querySelector(`.screen-canvas`);
const scene3d = new Scene3D(canvas);
const fullPageScroll = new FullPageScroll();
fullPageScroll.init();

scene3d.init();
scene3d.resize();
scene3d.loadScenesTextures((textures) => {
  scene3d.addTextures(textures);
  scene3d.createScenes();

  if (fullPageScroll.activeScreen === 0) {
    scene3d.setScene(0);
    scene3d.update();

  } else if (fullPageScroll.activeScreen === 1) {
    const storyScreen = document.querySelector(`#story`);
    const slideId = storyScreen.activeSlide;

    scene3d.setScene(slideId);
    scene3d.update();
  }
});

window.addEventListener(`load`, () => {
  setTimeout(() => {
    document.body.classList.add(`pageLoaded`);
  }, 100);
});
