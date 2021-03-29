export default function (sources, endCB = () => {}) {
  const images = {};
  const names = Object.keys(sources);
  const maxCount = names.length;
  const loadHandler = () => {
    counter += 1;

    if (counter >= maxCount) {
      endCB(images);
    }
  };
  let counter = 0;
  let image;

  names.forEach((name) => {
    image = new Image();
    image.src = sources[name];
    images[name] = image;

    if (image.complete) {
      loadHandler();

    } else {
      image.addEventListener(`load`, loadHandler);
    }
  });
}
