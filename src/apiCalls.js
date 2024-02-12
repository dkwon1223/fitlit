function fetchUserData(usersData) {
  return fetch("https://fitlit-api.herokuapp.com/api/v1/users")
    .then((response) => response.json())
    .then((data) => (usersData = data));
}
function fetchHydrationData(hydration) {
  return fetch("https://fitlit-api.herokuapp.com/api/v1/hydration")
    .then((repsonse) => repsonse.json())
    .then((data) => (hydration = data));
}

function fetchSleepData(sleep) {
  return fetch("https://fitlit-api.herokuapp.com/api/v1/sleep")
    .then((repsonse) => repsonse.json())
    .then((data) => (sleep = data));
}

export { fetchHydrationData, fetchUserData, fetchSleepData};
