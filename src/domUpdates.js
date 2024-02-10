import { fetchHydrationData, fetchUserData, fetchSleepData } from "./apiCalls";
import { CircularFluidMeter } from "fluid-meter";
import { getUserData, getAverageSteps } from "./users";
import {
  getFluidOunceForDay,
  getFluidOunceForWeek,
  getAverageFluidOunce,
} from "./hydration";
import {
  getAverageHoursSleptNet,
  getAverageSleepQualityNet,
  getHoursSlept,
  getSleepQuality,
  getHoursSleptWeek,
  getSleepQualityWeek,
} from "./sleep";

const info = document.querySelector("#info");
const friendsList = document.querySelector("#friends");
const waterMeter = document.querySelector("#waterMeterContainer");
const userHydrationDate = document.querySelector("#dateHydrationTitle");
const dayButtons = document.querySelector("#days");
const sleepHoursMeter = document.querySelector("#sleepHoursMeter");
const sleepHours = document.querySelector("#sleepHours");
const sleepQualityMeter = document.querySelector("#sleepQualityMeter");
const sleepQuality = document.querySelector("#sleepQuality");
const userSleepTitle = document.querySelector("#dateSleepTitle");
const sleepAverageTitle = document.querySelector("#averageSleepTitle");
const sleepHoursMeterAvg = document.querySelector("#sleepHoursMeterAverage");
const sleepHoursAvg = document.querySelector("#sleepHoursAverage");
const sleepQualityMeterAvg = document.querySelector(
  "#sleepQualityMeterAverage"
);
const sleepQualityAvg = document.querySelector("#sleepQualityAverage");

let user, hydration, sleep, today, flOzDays, userSleepInfo, sleepDay;

Promise.all([fetchHydrationData(), fetchUserData(), fetchSleepData()]).then(
  ([hydrationFetch, usersData, sleepFetch]) => {
    sleep = sleepFetch;
    hydration = hydrationFetch;
    const randomIndex =
      Math.floor(Math.random() * (usersData.users.length - 1)) + 1;
    user = getUserData(randomIndex, usersData.users);
    let avgStep = getAverageSteps(usersData.users);
    flOzDays = getFluidOunceForWeek(user.id, hydration.hydrationData);
    today = flOzDays.length - 1;
    userSleepInfo = getHoursSleptWeek(user.id, sleep);
    sleepDay = userSleepInfo.length - 1;
    updateButtonsDate(flOzDays);
    updateUserInfo(avgStep);
    updateHoursSlept(user, sleepDay);
    updateSleepQuality(user, sleepDay);
    updateSleepAverages(user);
  }
);

let createdWaterMeter = new CircularFluidMeter(waterMeter, {
  borderWidth: 15,
  maxProgress: 100,
  initialProgress: 0,
  backgroundColor: "#002d59",
  borderColor: "#3e4954",
  bubbleColor: "#6bcfff",
  fontFamily: "Codystar",
  fontSize: 34,
  progressFormatter: (value) => {
    return `${value.toFixed(0)} fl oz`;
  },
  fluidConfiguration: {
    color: "#1e90ff",
  },
});

function updateUserInfo(avgStep) {
  info.innerHTML = `<h1 id="name">Welcome: ${user.name}</h1>
  <h3 id="userID">ID: ${user.id} </h3>
  <h3 id="address">Address: ${user.address} </h3>
  <h3 id="emailAddress">Email: ${user.email} </h3>
  <h3 id="strideLength">Stride Length: ${user.strideLength}</h3>
  <h3 id="stepGoal">My Step Goal: ${user.dailyStepGoal} steps</h3>
  <h3 id="comparedStepGoal"> Avg Step Goal: ${avgStep} steps`;
  updateFriendsList(user.friends);
  updateHydration(user, today);
}

function updateFriendsList(friends) {
  friends.forEach((friend) => {
    friendsList.insertAdjacentHTML(
      "beforeend",
      `<aside>
        <h3>${friend.name}</h3>
        <h3>Step Goal: ${friend.dailyStepGoal}</h3>
        </aside>`
    );
  });
}

function updateHydration(user, day = 0) {
  const userHydration = getFluidOunceForDay(
    user.id,
    hydration.hydrationData,
    flOzDays[day].date
  );
  userHydrationDate.innerHTML = `<h1>Water Consumption</h1><h3>${userHydration.date}</h3>`;
  createdWaterMeter.progress = userHydration.numOunces;
}

dayButtons.addEventListener("click", (event) => {
  let button = event.target.closest("button");
  console.log(button);
  if (!flOzDays[today - Number(button.id)]) {
    userHydrationDate.innerHTML = `<h1>No Data to Display...</h1>`;
    createdWaterMeter.progress = 0;
  } else {
    updateHydration(user, today - Number(button.id));
    updateHoursSlept(user, sleepDay - Number(button.id));
    updateSleepQuality(user, sleepDay - Number(button.id));
  }
});

function updateHoursSlept(user, day) {
  const userSleepHours = getHoursSlept(user.id, sleep, userSleepInfo[day].date);
  userSleepTitle.innerHTML = `<h1>Daily Sleep Stats</h1><h3>${userSleepInfo[day].date}</h3>`;
  sleepProgressBar(userSleepHours, sleepHours, sleepHoursMeter, 12);
}

function updateSleepQuality(user, day) {
  const userSleepQuality = getSleepQuality(
    user.id,
    sleep,
    userSleepInfo[day].date
  );
  sleepProgressBar(userSleepQuality, sleepQuality, sleepQualityMeter, 5);
}

function sleepProgressBar(hours, type, meter, cap) {
  type.innerText = `${hours}`;
  meter.style.background = `conic-gradient(
    #00008B ${(hours / cap) * 360}deg,
    #89CFF0 ${(hours / cap) * 360}deg
  )`;
}

function updateSleepAverages(user) {
  const userSleepAvgHours = getAverageHoursSleptNet(user.id, sleep);
  const userSleepAvgQuality = getAverageSleepQualityNet(user.id, sleep);
  sleepAverageTitle.innerHTML = `<h1>Average Sleep Stats</h1>`;
  sleepProgressBar(userSleepAvgHours, sleepHoursAvg, sleepHoursMeterAvg, 12);
  sleepProgressBar(
    userSleepAvgQuality,
    sleepQualityAvg,
    sleepQualityMeterAvg,
    5
  );
}

function updateButtonsDate(dates) {
  const days = document.querySelectorAll(".day-selector");
  let count = 0;
  days.forEach((day) => {
    day.innerText = dates[today - count].date;
    count++;
  });
}

export { updateUserInfo };
