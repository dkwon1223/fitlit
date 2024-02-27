import "./css/styles.css";
import "./images/user-icon.svg";
import "./images/sleep-icon.svg";
import "./images/hydration-icon.svg";
import "./images/friends-icon.svg";
import {
  fetchHydrationData,
  fetchUserData,
  fetchSleepData,
  postHydrationData,
} from "./apiCalls";
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
const addHydrationButton = document.querySelector(".input-hydration");
const popUpError = document.querySelector(".pop-up-error");
const popUpForm = document.querySelector(".pop-up-form");
const closeFormButton = document.querySelector(".closeBtn");
const dateInput = document.querySelector("#dateInput");
const ozInput = document.querySelector("#ozInput");
const submitButton = document.querySelector(".formBtn");
const formError = document.querySelector(".form-error");
const draggables = document.querySelectorAll(".draggable");
const containers = document.querySelectorAll(".container");
const sleepMeters = document.querySelectorAll(".sleep-meter");

let containerPositions = {};
let user, hydration, sleep, today, flOzDays, userSleepInfo, currentPostion;
let createdWaterMeter = new CircularFluidMeter(waterMeter, {
  borderWidth: 15,
  maxProgress: 100,
  initialProgress: 0,
  backgroundColor: "#002d59",
  borderColor: "#3e4954",
  bubbleColor: "#6bcfff",
  fontFamily: "'M PLUS Rounded 1c', sans-serif",
  fontSize: 34,
  progressFormatter: (value) => {
    return `${value.toFixed(0)} fl oz`;
  },
  fluidConfiguration: {
    color: "#1e90ff",
  },
});

window.addEventListener("load", function () {
  if (!user) {
    updatePage();
  } else {
    updatePage(user.id);
  }
});

dayButtons.addEventListener("click", (event) => {
  let button = event.target.closest("button");

  if (!flOzDays[today - Number(button.id)]) {
    userHydrationDate.innerHTML = `<h1>No Data to Display...</h1>`;
    createdWaterMeter.progress = 0;
  } else {
    updateHydration(user, today - Number(button.id));
    updateHoursSlept(user, today - Number(button.id));
    updateSleepQuality(user, today - Number(button.id));
  }
});

submitButton.addEventListener("click", () => {
  if (ozInput.value.length > 0 && dateInput.value.length > 0) {
    closeForm();
    let date = dateInput.value.split("-").join("/");
    postHydrationData(date, ozInput.value, user.id);
  } else if (ozInput.value.trim().length === 0 && dateInput.value.length > 0) {
    event.preventDefault();
    formError.innerText = "Please enter Oz Drank...";
  } else if (ozInput.value.trim().length > 0 && dateInput.value.length === 0) {
    event.preventDefault();
    formError.innerText = "Please select a date...";
  } else {
    event.preventDefault();
    formError.innerText = "You need to select a date and enter Oz Drank!";
  }
});

addHydrationButton.addEventListener("click", openForm);

closeFormButton.addEventListener("click", closeForm);

function updatePage() {
  Promise.all([fetchHydrationData(), fetchUserData(), fetchSleepData()]).then(
    ([hydrationFetch, usersData, sleepFetch]) => {
      sleep = sleepFetch;
      hydration = hydrationFetch;
      let avgStep = getAverageSteps(usersData.users);
      user = userGrabber(usersData);
      getPositions();
      flOzDays = getDays(user.id, hydration.hydrationData);
      today = flOzDays.length - 1;
      userSleepInfo = getHoursSleptWeek(user.id, sleep);
      updateButtonsDate(flOzDays);
      updateUserInfo(avgStep);
      updateSleepAverages(user);
      updateHoursSlept(user, today);
      updateSleepQuality(user, today);
    }
  );
}

function getPositions() {
  if (sessionStorage.getItem("user")) {
    containers.forEach((container) => {
      let position = JSON.parse(sessionStorage.getItem('containerPositions')) || [];
      let positionKeys = Object.keys(position)
      positionKeys.forEach((key) => {
        if(container.id === key)
        container.appendChild(document.getElementById(position[key]))
      });
    });
  }
}

function getDays(id, hydration) {
  let flOzDays1 = getFluidOunceForWeek(id, hydration).map((day) => {
    return {
      date: new Date(day.date),
      ounces: day.ounces,
    };
  });
  flOzDays1.sort((a, b) => {
    return a.date - b.date;
  });
  let flOzDays2 = flOzDays1.map((day) => {
    return {
      date: day.date.toISOString().split("T")[0].replaceAll("-", "/"),
      ounces: day.ounces,
    };
  });
  return flOzDays2;
}

function userGrabber(usersData) {
  let index;
  if (sessionStorage.getItem("user")) {
    index = parseInt(sessionStorage.getItem("user"));
  } else {
    index = getUserIndex(usersData);
  }
  let currentUser = getUserData(index, usersData.users);
  return currentUser;
}

function getUserIndex(usersData) {
  return Math.floor(Math.random() * (usersData.users.length - 1)) + 1;
}

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
  friendsList.innerHTML = '<h1 id="friendsHeader">Friends</h1>';
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

function updateHoursSlept(user, day) {
  if (!userSleepInfo[day]) {
    userSleepTitle.innerHTML = `<h1>Daily Sleep Stats</h1><h3>No Sleep Data For ${flOzDays[day].date}</h3>`;
    sleepProgressBar(0, sleepHours, sleepHoursMeter, 12);
  } else {
    const userSleepHours = getHoursSlept(
      user.id,
      sleep,
      userSleepInfo[day].date
    );
    userSleepTitle.innerHTML = `<h1>Daily Sleep Stats</h1><h3>${userSleepInfo[day].date}</h3>`;
    sleepProgressBar(userSleepHours, sleepHours, sleepHoursMeter, 12);
  }
}

function updateSleepQuality(user, day) {
  if (!userSleepInfo[day]) {
    sleepProgressBar(0, sleepQuality, sleepQualityMeter, 5);
  } else {
    const userSleepQuality = getSleepQuality(
      user.id,
      sleep,
      userSleepInfo[day].date
    );
    sleepProgressBar(userSleepQuality, sleepQuality, sleepQualityMeter, 5);
  }
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

function openForm() {
  popUpForm.style.display = "block";
  sleepMeters.forEach((meter) => {
    meter.style.filter = "blur(6px)";
  });
}

function closeForm() {
  sessionStorage.setItem("user", user.id);
  popUpForm.style.display = "none";
  sleepMeters.forEach((meter) => {
    meter.style.filter = "none";
  });
}

draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging");
  });

  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging");

    if(sessionStorage.getItem("user")) {
      containers.forEach((container) => {
        let newPosition = Array.from(container.children).map((element) => element.id);
        containerPositions[container.id] = newPosition
      })
      sessionStorage.setItem('containerPositions', JSON.stringify(containerPositions))
    }
  });
});

containers.forEach((container) => {
  container.addEventListener("dragover", (e) => {
    e.preventDefault();
    let draggable = document.querySelector(".dragging");
    if(draggable) {
      let fromContainer = draggable.parentNode;
      if(fromContainer !== container) {
        let tgt = e.currentTarget.firstElementChild
        if(tgt) {
          fromContainer.replaceChild(tgt, draggable)
          container.appendChild(draggable)
        }
      }
    }
  });
})

