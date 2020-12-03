import AccentTypographyBuild from './accent-typography.js';

const INTRO_TITLE_CLASS = `.intro__title`;
const INTRO_DATE_CLASS = `.intro__date`;
const texts = [];

[
  INTRO_TITLE_CLASS,
  INTRO_DATE_CLASS,
].forEach((textClass) => {
  texts.push(new AccentTypographyBuild(textClass, 500, `active-accent-typography`, `transform`));
});

export function runLettersAnimations() {
  texts.forEach((text) => {
    text.runAnimation();
  });
}

export function destroyLettersAnimations() {
  texts.forEach((text) => {
    text.destroyAnimation();
  });
}
