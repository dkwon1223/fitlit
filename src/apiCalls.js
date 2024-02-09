// Your fetch requests will live here!
fetch("https://fitlit-api.herokuapp.com/api/v1/users")
  .then((response) => response.json())
  .then((data) => (usersData = data));

let usersData, hydration, sleep;

function fetchUserData() {
  return fetch("https://fitlit-api.herokuapp.com/api/v1/users")
    .then((response) => response.json())
    .then((data) => (usersData = data));
}
function fetchHydrationData() {
  return fetch("https://fitlit-api.herokuapp.com/api/v1/hydration")
    .then((repsonse) => repsonse.json())
    .then((data) => (hydration = data));
}

function fetchSleepData() {
  return fetch("https://fitlit-api.herokuapp.com/api/v1/sleep")
    .then((repsonse) => repsonse.json())
    .then((data) => (sleep = data));
}

export { fetchHydrationData, fetchUserData, usersData, hydration, sleep , fetchSleepData};
