const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const headerTitle = document.getElementById('headerTitle');

headerTitle.innerHTML = 'New Years Eve'
const currentYear = new Date().getUTCFullYear();
const setDateStr = `1 Jan ${currentYear + 1}`; 

function countDown() {
    const setDate = new Date(setDateStr);
    const currentDate = new Date();
    const remainingDaysInMilliSecs = setDate - currentDate;

    const totalSeconds = remainingDaysInMilliSecs / 1000;
    const days = Math.floor(totalSeconds / 3600 / 24);
    const hours = Math.floor(totalSeconds / 3600) % 24;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const seconds = Math.floor(totalSeconds) % 60;

    daysEl.innerHTML = days;
    hoursEl.innerHTML = formatTime(hours);
    minutesEl.innerHTML = formatTime(minutes);
    secondsEl.innerHTML = formatTime(seconds);
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

countDown();

setInterval(countDown, 1000);