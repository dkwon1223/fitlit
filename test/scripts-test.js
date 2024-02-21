import { expect } from "chai";

import { getUserData, getAverageSteps } from "../src/users";
import {
  getAverageFluidOunce,
  getFluidOunceForDay,
  getFluidOunceForWeek,
} from "../src/hydration";
import {
  getAverageHoursSleptNet,
  getAverageSleepQualityNet,
  getHoursSlept,
  getHoursSleptWeek,
  getSleepQuality,
  getSleepQualityWeek,
} from "../src/sleep";
describe("getUserData", function () {
  let users;
  beforeEach(() => {
    users = [
      {
        id: 1,
        name: "David Kwon",
        address: "1234 E Stanford Place",
        email: "dingus@gmail.com",
        strideLength: 5,
        dailyStepGoal: 4000,
        friends: [2, 3],
      },
      {
        id: 2,
        name: "Cory Sanders",
        address: "21312 Hello Ave",
        email: "yuppers@yahoo.com",
        strideLength: 4.5,
        dailyStepGoal: 9000,
        friends: [1, 3],
      },
      {
        id: 3,
        name: "Ethan Duvall",
        address: "48010 Balistreri Harbor, Cleobury IN 43317",
        email: "wowza@gmail.com",
        strideLength: 2.7,
        dailyStepGoal: 3000,
        friends: [1, 2],
      },
    ];
  });

  it("should retrieve user data based on ID", function () {
    const coryData = getUserData(2, users);
    expect(coryData).to.deep.equal({
      id: 2,
      name: "Cory Sanders",
      address: "21312 Hello Ave",
      email: "yuppers@yahoo.com",
      strideLength: 4.5,
      dailyStepGoal: 9000,
      friends: [
        {
          id: 1,
          name: "David Kwon",
          address: "1234 E Stanford Place",
          email: "dingus@gmail.com",
          strideLength: 5,
          dailyStepGoal: 4000,
          friends: [2, 3],
        },
        {
          id: 3,
          name: "Ethan Duvall",
          address: "48010 Balistreri Harbor, Cleobury IN 43317",
          email: "wowza@gmail.com",
          strideLength: 2.7,
          dailyStepGoal: 3000,
          friends: [1, 2],
        },
      ],
    });
  });
});

describe("getAverageSteps", function () {
  let users;
  beforeEach(() => {
    users = [
      {
        id: 1,
        name: "David Kwon",
        address: "1234 E Stanford Place",
        email: "dingus@gmail.com",
        strideLength: 5,
        dailyStepGoal: 4000,
        friends: [5, 43, 46, 11],
      },
      {
        id: 2,
        name: "Cory Sanders",
        address: "21312 Hello Ave",
        email: "yuppers@yahoo.com",
        strideLength: 4.5,
        dailyStepGoal: 9000,
        friends: [13, 19, 3],
      },
      {
        id: 3,
        name: "Ethan Duvall",
        address: "48010 Balistreri Harbor, Cleobury IN 43317",
        email: "wowza@gmail.com",
        strideLength: 2.7,
        dailyStepGoal: 3000,
        friends: [31, 16, 15, 7],
      },
    ];
  });

  it("should return average step goals for users", function () {
    const averageSteps = getAverageSteps(users);
    expect(averageSteps).to.equal(5333);
  });
});

describe("getAverageFluidOunces", function () {
  let hydrationData;
  this.beforeEach(() => {
    hydrationData = [
      {
        userID: 1,
        date: "2023/03/24",
        numOunces: 30,
      },
      {
        userID: 2,
        date: "2023/03/24",
        numOunces: 45,
      },
      {
        userID: 3,
        date: "2023/03/24",
        numOunces: 83,
      },
      {
        userID: 1,
        date: "2023/06/30",
        numOunces: 70,
      },
      {
        userID: 2,
        date: "2023/06/30",
        numOunces: 100,
      },
      {
        userID: 3,
        date: "2023/06/30",
        numOunces: 42,
      },
      {
        userID: 1,
        date: "2023/07/01",
        numOunces: 95,
      },
      {
        userID: 2,
        date: "2023/07/01",
        numOunces: 67,
      },
      {
        userID: 3,
        date: "2023/07/01",
        numOunces: 55,
      },
    ];
  });

  it("should show the user's avg fluid ounces consumed per day all time", function () {
    const ouncesUser1 = getAverageFluidOunce(1, hydrationData);
    expect(ouncesUser1).to.equal(65);

    const ouncesUser2 = getAverageFluidOunce(2, hydrationData);
    expect(ouncesUser2).to.equal(71);

    const ouncesUser3 = getAverageFluidOunce(3, hydrationData);
    expect(ouncesUser3).to.equal(60);
  });
});

describe("getFluidOuncesForDay", function () {
  let hydrationData;
  this.beforeEach(() => {
    hydrationData = [
      {
        userID: 1,
        date: "2023/03/24",
        numOunces: 30,
      },
      {
        userID: 2,
        date: "2023/03/24",
        numOunces: 45,
      },
      {
        userID: 3,
        date: "2023/03/24",
        numOunces: 83,
      },
      {
        userID: 1,
        date: "2023/06/30",
        numOunces: 70,
      },
      {
        userID: 2,
        date: "2023/06/30",
        numOunces: 100,
      },
      {
        userID: 3,
        date: "2023/06/30",
        numOunces: 42,
      },
      {
        userID: 1,
        date: "2023/07/01",
        numOunces: 95,
      },
      {
        userID: 2,
        date: "2023/07/01",
        numOunces: 67,
      },
      {
        userID: 3,
        date: "2023/07/01",
        numOunces: 55,
      },
    ];
  });

  it("should show user's ounces consumed for a specific day", function () {
    const ouncesSpecificDay1 = getFluidOunceForDay(
      1,
      hydrationData,
      "2023/06/30"
    );
    expect(ouncesSpecificDay1).to.deep.equal({
      userID: 1,
      date: "2023/06/30",
      numOunces: 70,
    });

    const ouncesSpecificDay2 = getFluidOunceForDay(
      2,
      hydrationData,
      "2023/07/01"
    );
    expect(ouncesSpecificDay2).to.deep.equal({
      userID: 2,
      date: "2023/07/01",
      numOunces: 67,
    });

    const ouncesSpecificDay3 = getFluidOunceForDay(
      3,
      hydrationData,
      "2023/03/24"
    );
    expect(ouncesSpecificDay3).to.deep.equal({
      userID: 3,
      date: "2023/03/24",
      numOunces: 83,
    });
  });
});

describe("getFluidOunceForWeek", function () {
  let hydrationData;
  this.beforeEach(() => {
    hydrationData = [
      {
        userID: 1,
        date: "2023/03/24",
        numOunces: 30,
      },
      {
        userID: 2,
        date: "2023/03/24",
        numOunces: 45,
      },
      {
        userID: 3,
        date: "2023/03/24",
        numOunces: 83,
      },
      {
        userID: 1,
        date: "2023/06/30",
        numOunces: 70,
      },
      {
        userID: 2,
        date: "2023/06/30",
        numOunces: 100,
      },
      {
        userID: 3,
        date: "2023/06/30",
        numOunces: 42,
      },
      {
        userID: 1,
        date: "2023/07/01",
        numOunces: 95,
      },
      {
        userID: 2,
        date: "2023/07/01",
        numOunces: 67,
      },
      {
        userID: 3,
        date: "2023/07/01",
        numOunces: 55,
      },
    ];
  });


  it("should show fluid ounces consumed each day over a week", function () {
    const userFluidOunces1 = getFluidOunceForWeek(1, hydrationData);
    expect(userFluidOunces1).to.deep.equal([
      {
        date: "2023/03/24",
        ounces: 30,
      },
      {
        date: "2023/06/30",
        ounces: 70,
      },
      {
        date: "2023/07/01",
        ounces: 95,
      },
    ]);
  });
});

describe("Test sleep functions", function () {
  const sleepTest = {
    sleepData: [
      {userID: 5, date: "2023/03/24", hoursSlept: 8, sleepQuality: 3.1},
      { userID: 5, date: "2023/03/25", hoursSlept: 4, sleepQuality: 2.1},
      { userID: 5, date: "2023/03/26", hoursSlept: 5.7, sleepQuality: 1.7},
      { userID: 31, date: "2023/03/24", hoursSlept: 4.9, sleepQuality: 4.9},
      { userID: 32, date: "2023/03/24", hoursSlept: 11, sleepQuality: 4.7},
      { userID: 5, date: "2023/03/27", hoursSlept: 5.7, sleepQuality: 1.7},
      { userID: 5, date: "2023/03/28", hoursSlept: 10.4, sleepQuality: 2.6},
      { userID: 5, date: "2023/03/29", hoursSlept: 9.8, sleepQuality: 3},
      { userID: 5, date: "2023/03/30", hoursSlept: 10, sleepQuality: 2.4}
    ],
  };
  const userTest = {
    id: 5,
    name: "David Kwon",
    address: "1234 E Stanford Place",
    email: "dingus@gmail.com",
    strideLength: 5,
    dailyStepGoal: 4000,
    friends: [2, 3],
  };

  beforeEach(function () {
    this.user = userTest;
    this.sleep = sleepTest;
  });

  describe("getAverageHoursSleptNet", function () {
    it("Should return avg sleep for the user", function () {
      const expected = getAverageHoursSleptNet(this.user.id, this.sleep);
      expect(expected).to.equal(7.7);
    });
  });
  describe("getAverageSleepQualityNet", function () {
    it("Should return avg sleep quality", function () {
      const expected = getAverageSleepQualityNet(this.user.id, this.sleep);
      expect(expected).to.equal(2.4);
    });
  });
  describe("getHoursSlept", function () {
    it("should return the hours slept for a certain day", function () {
      const expected = getHoursSlept(this.user.id, this.sleep, "2023/03/24");
      expect(expected).to.equal(8);
    });
  });
  describe("getSleepQuality", function () {
    it("should return sleep quailty for the selected day", function () {
      const expected = getSleepQuality(this.user.id, this.sleep, "2023/03/24");
      expect(expected).to.equal(3.1);
    });
  });
  describe("getHoursSleptWeek", function () {
    it("should get the hours slept for the week", function () {
      const expected = getHoursSleptWeek(
        this.user.id,
        this.sleep,
        "2023/03/30"
      );
      expect(expected).to.be.an("array").with.lengthOf(7);
    });
  });
  describe("getSleepQualityWeek", function () {
    it("should return sleep quality for 7 days", function () {
      const expected = getSleepQualityWeek(
        this.user.id,
        this.sleep,
        "2023/03/24"
      );
      expect(expected).to.be.an("array").with.lengthOf(7);
    });
  });
});
