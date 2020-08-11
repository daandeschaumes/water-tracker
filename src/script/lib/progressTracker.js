class ProgressTracker {
  constructor(options) {
    console.log(options);
    this.options = options;

    this.percentageValue = 0;
    this.currentProgress = [];
    //dataAccess[this.options.mode].getProgressOfToday() || [];
    this.timerId = null;

    this.percentageRatio = 100 / this.options.dailyGoal;

    this.percentage = document.querySelector(
      `.${this.options.domRefs.percentage}`
    );
    this.timeStampHolder = document.querySelector(
      `.${this.options.domRefs.timeStampHolder}`
    );
    this.addButton = document.querySelector(
      `.${this.options.domRefs.addButton}`
    );
    this.currentGoalHolders = document.querySelectorAll(
      `.${this.options.domRefs.currentGoal}`
    );
    this.currentUnitHolders = document.querySelectorAll(
      `.${this.options.domRefs.currentUnits}`
    );

    this.showUserOptions();

    this.restoreProgress();
    this.listenToNewLogging();
  }
  restoreProgress() {
    this.currentProgress = dataAccess[this.options.mode].getProgressByDate(
      new Date()
    );
    for (const p of this.currentProgress) {
      this.updateProgress(p);
    }

    // units: "ml",
    // dailyGoal: 2000,
    // mode: "local",
    // domRefs: {
    //   percentage: "js-amount",
    //   timeStampHolder: "js-timestamps",
    //   addButton: "js-log",
    //   currentGoal: "js-goal",
    //   currentUnits: "js-units"
    // },
    // afterUpdate: function(newPercentage) {
    //   console.log("It has been updated!");
    // }
  }

  updateProgress(newLogging = ["00:00", 0]) {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
    //this.currentProgress.push(newLogging);
    this.showTimeStamp(newLogging[0]);
    const oldProgress = Number(this.percentage.innerText),
      newProgress = oldProgress + newLogging[1] * this.percentageRatio;

    this.percentageValue = newProgress;

    let v = oldProgress;
    this.timerId = setInterval(() => {
      this.percentage.innerText = v;
      if (v >= newProgress) {
        clearInterval(this.timerId);
      }
      v++;
    }, 32);
    this.options.afterUpdate(newProgress); //When finished, pass the new progress
  }

  showUserOptions() {
    for (const g of this.currentGoalHolders) {
      g.innerHTML = this.options.dailyGoal;
    }

    for (const u of this.currentUnitHolders) {
      u.innerHTML = this.options.units;
    }
  }

  showTimeStamp(timeStamp) {
    this.timeStampHolder.innerHTML += `<li class="c-time-stamp">${timeStamp}</li>`;
  }
  listenToNewLogging() {
    this.addButton.addEventListener("click", () => {
      console.log("Dataset is", this.addButton.dataset.amount);
      const now = new Date();
      const time = `${now
          .getHours()
          .toString()
          .padStart(2, "0")} : ${now
          .getMinutes()
          .toString()
          .padStart(2, "0")}`,
        amount = this.addButton.dataset.amount;
      this.updateProgress([time, amount]);
      // Todo: dataAccess[this.options.mode].saveLogging([time, amount]);
    });
  }
}
