const timeElement = document.querySelector('.js-time')
const toggleButtonElement = document.querySelector('.js-toggle-button')
const lapResetButtonElement = document.querySelector('.js-lap-reset-button')
let stopwatchRunning = false
let intervalID
let time = 0
let laps = []
renderTime()

toggleButtonElement.addEventListener('click', () => {
  if (!stopwatchRunning) {
    intervalID = setInterval(() => {
      time += 10;
      renderTime();
    }, 10)
    stopwatchRunning = true;
  } else {
    clearInterval(intervalID);
    stopwatchRunning = false;
  }
})

lapResetButtonElement.addEventListener('click', () => {
  if (!stopwatchRunning) {
    time = 0;
    renderTime();
    laps = [];
    renderLaps();
  } else {
    const currentLap = laps.length + 1
    const prevLap = laps[laps.length - 1] || {
      name: 'lap 0',
      time: 0
    }
    //console.log(prevLap)
    let lap = {
      name: `lap ${currentLap}`,
      interval: time - prevLap.time,
      time
    }
    //console.log(lap)
    laps.push(lap)
    renderLaps()
  }
})

function timeFormat(time) {
  const ms = Math.round((time % 1000)/10);
  time = Math.floor(time / 1000);
  const sec = time % 60;
  time = Math.floor(time / 60);
  const min = time % 60;
  return `${min}:${twoDigits(sec)}.${twoDigits(ms)}`;
}

function twoDigits(num) {
  return (num < 10) ? "0" + String(num) : num
}

function renderTime() {
  timeElement.innerHTML = timeFormat(time)
}

function renderLaps() {
  let HTML = ''
  laps.forEach((lap) => {
    HTML += `
    <div class="lap">
      <div class="lap-name">
        ${lap.name}
      </div>
      <div class="lap-time">
        ${timeFormat(lap.interval)}
      </div>
    </div>`
  })
  document.querySelector('.laps').innerHTML = HTML;
}