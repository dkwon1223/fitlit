// I tried to keep the numbers to one decimal place like the data

// I think it should return a number rounded to one decimal place i.e 7.1 hours 
function getAverageHoursSleptNet(userID, sleep) {
    let allSleepData = sleep.sleepData.filter((data) => {
        return data.userID === userID;
    });
    let netHours = allSleepData.reduce((acc, data) => {
        acc += data.hoursSlept;
        return acc;
    }, 0)
    return (Math.round(10*netHours/allSleepData.length)/10);
}

// I think it should return a number rounded to one decimal place i.e 3.6 sleep quality
function getAverageSleepQualityNet(userID, sleep) {
    let allSleepData = sleep.sleepData.filter((data) => {
        return data.userID === userID;
    });
    let netQuality = allSleepData.reduce((acc, data) => {
        acc += data.sleepQuality;
        return acc;
    }, 0)
    return (Math.round(10*netQuality/allSleepData.length)/10);
}

// I believe when userID, sleep, and "2023/03/26"-type string as date are passed in, it should return the hoursSlept 
function getHoursSlept(userID, sleep, date) {
    let allSleepData = sleep.sleepData.filter((data) => {
        return data.userID === userID;
    });
    let targetDate = allSleepData.find((data) => {
        return data.date === date;
    });
    return targetDate.hoursSlept;
}

// Same as other function but returns the sleepQuality hopefully
function getSleepQuality(userID, sleep, date) {
    let allSleepData = sleep.sleepData.filter((data) => {
        return data.userID === userID;
    });
    let targetDate = allSleepData.find((data) => {
        return data.date === date;
    });
    return targetDate.sleepQuality;
}

// Should return a spliced array of hoursSlept from last 7 days even if not consecutive I think? hopefully the indexOf works...
// also takes in userID, sleep, and "2023/03/24"-type string as date
function getHoursSleptWeek(userID, sleep, date) {
    let allSleepData = sleep.sleepData.filter((data) => {
        return data.userID === userID;
    });
    let targetDate = allSleepData.find((data) => {
        return data.date === date;
    });
    let week = allSleepData.splice((allSleepData.indexOf(targetDate)-7), (allSleepData.indexOf(targetDate)+1));
    return week.map((day) => {
        return day.hoursSlept;
    })
}

// same as above but should return a spliced array of just sleepQuality numbers
function getSleepQualityWeek(userID, sleep, date) {
    let allSleepData = sleep.sleepData.filter((data) => {
        return data.userID === userID;
    });
    let targetDate = allSleepData.find((data) => {
        return data.date === date;
    });
    let week = allSleepData.splice((allSleepData.indexOf(targetDate)-7), (allSleepData.indexOf(targetDate)+1));
    return week.map((day) => {
        return day.sleepQuality;
    })
}

export {getAverageHoursSleptNet, getAverageSleepQualityNet, getHoursSlept, getHoursSleptWeek, getSleepQuality, getSleepQualityWeek}