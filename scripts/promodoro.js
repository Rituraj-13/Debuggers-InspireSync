let minute = document.getElementById('min_side');
let second = document.getElementById('sec_side');
let time = document.getElementById('time');
let reset = document.getElementById('reset_btn');
let startBtn = document.getElementById('start_btn');

let set;
let count = 59;
let paused = true;
let minCount = 24;

time.innerText = `${minCount + 1}:00`;
const appendZero = (value) => {
  value = value < 10 ? `0${value}` : value;
  return value;
};

reset.addEventListener(
  "click",
  (resetTime = () => {
    pauseTimer();
    minCount = 24;
    count = 59;
    time.innerText = `${minCount + 1}:00`;
  })
);

const pauseTimer = () => {
  paused = true;
  clearInterval(set);
}

startBtn.addEventListener("click", () => {
  if (paused) {
    paused = false;
    time.innerText = `${appendZero(minCount)}:${appendZero(count)}`;
    set = setInterval(() => {
      count--;
      time.innerText = `${appendZero(minCount)}:${appendZero(count)}`;
      if (count == 0) {
        if (minCount != 0) {
          minCount--;
          count = 60;
        } else {
          clearInterval(set);
        }
      }
    }, 1000);
  }
});