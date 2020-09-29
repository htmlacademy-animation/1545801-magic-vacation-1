import AccentTypographyBuild from './accent-typography.js';

export default function() {
  const title = '.intro__title';
  const titleAccentTypography = new AccentTypographyBuild(title, 500, 'active-accent-typography', 'transform');
  const date = '.intro__date';
  const dateAccentTypography = new AccentTypographyBuild(date, 500, 'active-accent-typography', 'transform');
  
  setTimeout(() => {
    titleAccentTypography.runAnimation();
    dateAccentTypography.runAnimation();
  }, 500);

  document.body.classList.add('pageLoaded');
}
