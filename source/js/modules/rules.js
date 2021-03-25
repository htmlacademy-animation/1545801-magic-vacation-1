export default () => {

  const rulesTexts = document.querySelectorAll(`.rules__item p`);
  const numberOfTexts = rulesTexts.length;
  const lastText = rulesTexts[numberOfTexts - 1];
  const rulesButton = document.querySelector(`.rules__link`);

  lastText.addEventListener(`animationend`, () => {
    rulesButton.classList.add(`rules__link-active`);
  });
};
