import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const selector = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');

startBtn.disabled = true;

let userSelectedDate;
let intervalId;

function validateDate(date) {
  const currentTime = new Date();
  if (date > currentTime) {
    userSelectedDate = date;
    console.log("Date selected:", userSelectedDate);
    startBtn.disabled = false;
  } else {
    alert("Please choose a date in the future");
    startBtn.disabled = true;
  }
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      validateDate(selectedDates[0]);
      if (selectedDates[0] > options.defaultDate) {
          userSelectedDate = selectedDates[0]
      }
  },
};

flatpickr(selector, options);


startBtn.addEventListener('click', () => {
  intervalId = setInterval(() => {
    const diffMS = userSelectedDate - new Date();
      
    if (diffMS <= 0) {
      clearInterval(intervalId);
      addLeadingZero(0);
      return;
    }

    addLeadingZero(diffMS);
  }, 1000);
});



function addLeadingZero(ms) {
    const { days, hours, minutes, seconds } = convertMs(ms);

    daysSpan.textContent = days.toString().padStart(2, '0');
    hoursSpan.textContent = hours.toString().padStart(2, '0');
    minutesSpan.textContent = minutes.toString().padStart(2, '0');
    secondsSpan.textContent = seconds.toString().padStart(2, '0');
}


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}