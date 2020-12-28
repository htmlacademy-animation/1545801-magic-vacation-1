export default function (duration) {
  let milliseconds = ~~((duration % 1000) / 100);
  let seconds = ~~((duration / 1000) % 60);
  let minutes = ~~((duration / (1000 * 60)) % 60);
  let hours = ~~((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? `0` + hours : hours;
  minutes = (minutes < 10) ? `0` + minutes : minutes;
  seconds = (seconds < 10) ? `0` + seconds : seconds;

  return {
    hours,
    minutes,
    seconds,
    milliseconds,
  };
}
