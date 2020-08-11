const dataAccess = (function() {
  const local = (function() {
    const getProgressByDate = function(date) {
      //Check storage for the current day
      //key maken voor 2019-04 -> {1: []}
      return [["13:01", 100], ["12:10", 100], ["15:01", 100]];
    };
    //getAll
    //deleteItem
    return {
      getProgressByDate: getProgressByDate
    };
  })();

  const api = (function() {
    // Moet dezelfde functies hebben als local
    return;
  })();

  return {
    local: local,
    api: api
  };
})();
