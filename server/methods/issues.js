Meteor.methods({
  /**
   * Updates issue count
   */
  updateIssues: function (date, incToDo, incInProgress, incCodeReview, incCompleted) {
    var issuesData = Issues.findOne({
      date: date
    });
    //no data yet for that date
    //first check for prev data
    var prevData = Issues.findOne({},{sort:{date: -1}});
    //nothing in DB
    if (!prevData) {
      Issues.insert({
        date: date,
        countToDo: incToDo,
        countInProgress: incInProgress,
        countCodeReview: incCodeReview,
        countCompleted: incCompleted
      });
    }
    //compare with data for that date or latest data
    else {
      //update data for that date
      if (issuesData) {
        Issues.update({date: date}, {
          $inc: {
            countToDo: incToDo,
            countInProgress: incInProgress,
            countCodeReview: incCodeReview,
            countCompleted: incCompleted
          }
        });
      }
      //create data for that date based on latest data
      else {
        var oldToDo = prevData.countToDo;
        var oldInProgress = prevData.countInProgress;
        var oldCodeReview = prevData.countCodeReview;
        var oldCompleted = prevData.countCompleted;

        Issues.insert({
          date: date,
          countToDo: oldToDo + incToDo,
          countInProgress: oldInProgress + incInProgress,
          countCodeReview: oldCodeReview + incCodeReview,
          countCompleted: oldCompleted + incCompleted
        });
      }
    }
  }
});