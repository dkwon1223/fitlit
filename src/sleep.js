function getAverageHoursSleptNet(userID, sleep) {
  let allSleepData = sleep.sleepData.filter((data) => {
    return data.userID === userID;
  });
  let netHours = allSleepData.reduce((acc, data) => {
    acc += data.hoursSlept;
    return acc;
  }, 0);
  return Math.round((10 * netHours) / allSleepData.length) / 10;
}

function getAverageSleepQualityNet(userID, sleep) {
  let allSleepData = sleep.sleepData.filter((data) => {
    return data.userID === userID;
  });
  let netQuality = allSleepData.reduce((acc, data) => {
    acc += data.sleepQuality;
    return acc;
  }, 0);
  return Math.round((10 * netQuality) / allSleepData.length) / 10;
}

function getHoursSlept(userID, sleep, date) {
  let allSleepData = sleep.sleepData.filter((data) => {
    return data.userID === userID;
  });
  let targetDate = allSleepData.find((data) => {
    return data.date === date;
  });
  return targetDate.hoursSlept;
}

function getSleepQuality(userID, sleep, date) {
  let allSleepData = sleep.sleepData.filter((data) => {
    return data.userID === userID;
  });
  let targetDate = allSleepData.find((data) => {
    return data.date === date;
  });
  return targetDate.sleepQuality;
}

function getHoursSleptWeek(userID, sleep) {
  let allSleepData = sleep.sleepData.filter((data) => {
    return data.userID === userID;
  });
  return allSleepData;
}

function getSleepQualityWeek(userID, sleep) {
  let allSleepData = sleep.sleepData.filter((data) => {
    return data.userID === userID;
  });
  return allSleepData;
}

export {
  getAverageHoursSleptNet,
  getAverageSleepQualityNet,
  getHoursSlept,
  getSleepQuality,
  getHoursSleptWeek,
  getSleepQualityWeek,
};
