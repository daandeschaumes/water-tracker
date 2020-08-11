(function() {
  console.log("💧", "https://www.youtube.com/watch?v=ARC1w1WWxGY");

  const options = {
    units: "ml",
    dailyGoal: 1600,
    mode: "local",
    domRefs: {
      percentage: "js-amount",
      timeStampHolder: "js-timestamps",
      addButton: "js-log",
      currentGoal: "js-goal",
      currentUnits: "js-units"
    },
    afterUpdate: function(newPercentage) {
      uiBinding.wave.updateWaveHeight(newPercentage);
      console.log("It has been updated!", newPercentage);
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    uiBinding.wave.setup("js-waves");
    uiBinding.logging.setup("js-log");

    uiBinding.logging.enableAmountOptions();
    new ProgressTracker(options);
  });
})();
