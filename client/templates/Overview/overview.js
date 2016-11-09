Template.overview.helpers({
  /**
   * returns Object containing toDo data from Cards collection
   */
  'toDo': function() {
    return Cards.find({category: "toDo"});
  }
});