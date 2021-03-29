import ease from './easing';

export default (obj, options) => {
  const onComplete = options.onComplete;
  const onChange = options.onChange;
  const duration = options.duration;
  const easing = ease[options.easing] || ease.easeInOutQuad;
  const to = options.props || {};
  const propsNames = Object.keys(to);
  const from = {};
  const startTime = performance.now();
  const endTime = startTime + duration;
  const byValues = {};
  const update = () => {
    let value;

    currentTime = performance.now();

    if (currentTime >= endTime) {
      currentTime = endTime;
      isComplete = true;
    }
    timePassed = currentTime - startTime;
    progress = timePassed / duration;

    propsNames.forEach((name) => {
      value = easing(
          timePassed,
          from[name],
          byValues[name],
          duration
      );

      if (name === `alpha`) {
        value = fixAlpha(value);
      }
      obj[name] = value;
    });


    if (onChange) {
      onChange(progress);
    }

    if (isComplete) {
      if (onComplete) {
        onComplete();
      }

    } else {
      requestAnimationFrame(update);
    }
  };
  let isComplete = false;
  let timePassed;
  let progress;
  let currentTime;

  propsNames.forEach((name) => {
    from[name] = obj[name];
    byValues[name] = to[name] - from[name];
  });
  requestAnimationFrame(update);
};

function fixAlpha(value) {
  if (value < 0) {
    return 0;
  } else if (value > 1) {
    return 1;
  }
  return value;
}
