import throttle from 'lodash/throttle';
import {
  runLettersAnimations,
  destroyLettersAnimations,
} from './intro';
import Timer from './timer';
import msParser from './ms-parser';

const INTRO_SCREEN_ID = 0;
const STORY_SCREEN_ID = 1;
const PRIZES_SCREEN_ID = 2;
const GAME_SCREEN_ID = 4;
const updateGameCounter = (timeLeft) => {
  const gameCounter = document.querySelector(`.game__counter`);
  const time = msParser(timeLeft);

  gameCounter.innerHTML = `<span>${time.minutes}</span>:<span>${time.seconds}</span>`;
};
const prizesIcons = {
  journeys: document.querySelector(`#prizes__icon--journeys`),
  cases: document.querySelector(`#prizes__icon--cases`),
  codes: document.querySelector(`#prizes__icon--codes`),
};

export default class FullPageScroll {
  constructor() {
    this.THROTTLE_TIMEOUT = 2000;

    this.screenElements = document.querySelectorAll(`.screen:not(.screen--result)`);
    this.menuElements = document.querySelectorAll(`.page-header__menu .js-menu-link`);
    this.bgOverlap = document.querySelector(`.background-overlap`);

    this.activeScreen = 0;
    this.onScrollHandler = this.onScroll.bind(this);
    this.onUrlHashChengedHandler = this.onUrlHashChanged.bind(this);
    this.gameTimer = new Timer(3000, updateGameCounter);

  }

  init() {
    document.addEventListener(`wheel`, throttle(this.onScrollHandler, this.THROTTLE_TIMEOUT, {trailing: true}));
    window.addEventListener(`popstate`, this.onUrlHashChengedHandler);

    this.onUrlHashChanged();
  }

  onScroll(evt) {
    const currentPosition = this.activeScreen;
    this.reCalculateActiveScreenPosition(evt.deltaY);
    if (currentPosition !== this.activeScreen) {
      this.changePageDisplay();
    }
  }

  onUrlHashChanged() {
    const newIndex = Array.from(this.screenElements).findIndex((screen) => location.hash.slice(1) === screen.id);
    this.prevActiveScreen = this.activeScreen;
    this.activeScreen = (newIndex < 0) ? 0 : newIndex;
    this.changePageDisplay();
  }

  changePageDisplay() {
    this.changeVisibilityDisplay();
    this.changeActiveMenuItem();
    this.emitChangeDisplayEvent();
  }

  changeVisibilityDisplay() {
    this.screenElements.forEach((screen) => {
      screen.classList.add(`screen--hidden`);
      screen.classList.remove(`active`);
    });
    this.screenElements[this.activeScreen].classList.remove(`screen--hidden`);
    this.screenElements[this.activeScreen].classList.add(`active`);

    if (this.activeScreen === PRIZES_SCREEN_ID) {

      if (prizesIcons.journeys.src !== `img/prize1.svg`) {
        prizesIcons.journeys.src = `img/prize1.svg`;
      }

      if (prizesIcons.cases.src !== `img/prize2.svg`) {
        prizesIcons.cases.src = `img/prize2.svg`;
      }

      if (prizesIcons.codes.src !== `img/prize3.svg`) {
        prizesIcons.codes.src = `img/prize3.svg`;
      }
    }

    if (this.activeScreen === PRIZES_SCREEN_ID) {

      if (this.prevActiveScreen === STORY_SCREEN_ID) {
        this.bgOverlap.classList.add(`overlap-active`);
      }
      this.bgOverlap.style.height = `100%`;

    } else if (this.bgOverlap.classList.contains(`overlap-active`)) {
      this.bgOverlap.classList.remove(`overlap-active`);
      this.bgOverlap.style.height = `0`;
    }

    if (this.activeScreen === INTRO_SCREEN_ID) {
      destroyLettersAnimations();
      setTimeout(runLettersAnimations, 300);
    }

    if (this.activeScreen === GAME_SCREEN_ID) {
      this.gameTimer.restartTimer();
    }

    if (this.prevActiveScreen === GAME_SCREEN_ID) {
      this.gameTimer.stopTimer();
    }
  }

  changeActiveMenuItem() {
    const activeItem = Array.from(this.menuElements).find((item) => item.dataset.href === this.screenElements[this.activeScreen].id);
    if (activeItem) {
      this.menuElements.forEach((item) => item.classList.remove(`active`));
      activeItem.classList.add(`active`);
    }
  }

  emitChangeDisplayEvent() {
    const event = new CustomEvent(`screenChanged`, {
      detail: {
        'screenId': this.activeScreen,
        'screenName': this.screenElements[this.activeScreen].id,
        'screenElement': this.screenElements[this.activeScreen]
      }
    });

    document.body.dispatchEvent(event);
  }

  reCalculateActiveScreenPosition(delta) {
    this.prevActiveScreen = this.activeScreen;
    if (delta > 0) {
      this.activeScreen = Math.min(this.screenElements.length - 1, ++this.activeScreen);
    } else {
      this.activeScreen = Math.max(0, --this.activeScreen);
    }
  }
}
