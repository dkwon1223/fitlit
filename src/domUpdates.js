//NOTE: Your DOM manipulation will occur in this file
import { fetchHydrationData, fetchUserData } from "./apiCalls";

import { CircularFluidMeter } from "fluid-meter";
import { getUserData, getAverageSteps } from "./users";
import {
  getFluidOunceForDay,
  getFluidOunceForWeek,
  getAverageFluidOunce,
} from "./hydration";

const info = document.querySelector("#info");
const friendsList = document.querySelector("#friends");
const waterMeter = document.querySelector("#waterMeterContainer");
const userHydrationDate = document.querySelector("#dateHydrationTitle");
const hydrationWeekButtons = document.querySelector("#hydrationDays");
const randomDay = Math.floor(Math.random() * 100);
let user
let hydration
Promise.all([fetchHydrationData(), fetchUserData()])
.then(([hydrationFetch, usersData]) => {
  hydration = hydrationFetch
  const randomIndex =
    Math.floor(Math.random() * (usersData.users.length - 1)) + 1;
  user = getUserData(randomIndex, usersData.users);
  let avgStep = getAverageSteps(usersData.users);
  const flOzDays = getFluidOunceForWeek(user.id,hydration.hydrationData);
  updateUserInfo(avgStep);
  updateHydration(randomDay,flOzDays);
});

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

function updateHydration(day = 0,flOzDays) {
  const userHydration = getFluidOunceForDay(
    user.id,
    hydration.hydrationData,
    flOzDays[day].date
  );
  userHydrationDate.innerHTML = `<h1>Water Consumption</h1><h3>${userHydration.date}</h3>`;
  createdWaterMeter.progress = userHydration.numOunces;
}


hydrationWeekButtons.addEventListener("click", (event) => {
  if (!flOzDays[randomDay - Number(event.target.id)]) {
    userHydrationDate.innerHTML = `<h1>No Data to Display...`;
    createdWaterMeter.progress = 0;
  } else {
    updateHydration(user, randomDay - Number(event.target.id));
  }
});

export { updateUserInfo };
