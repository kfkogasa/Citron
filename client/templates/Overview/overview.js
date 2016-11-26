Template.overview.events({
  /**
   * redirects to cardDetail template which will display clicked card's info
   */

  "click .card": function() {
    var cardId = this._id;
    //save clicked card's id
    Session.set("selectedCard",cardId);
    Router.go('cardDetails')
  },
});

Template.overview.helpers({
  /**
   * returns Object containing toDo data from Cards collection
   */
  'toDo': function() {
    return Cards.find({category: "toDo"});
  },
  /**
   * returns Object containing inProgress data from Cards collection
   */
  'inProgress': function() {
    return Cards.find({category: "inProgress"});
  },
  /**
   * returns Object containing codeReview data from Cards collection
   */
  'codeReview': function() {
    return Cards.find({category: "codeReview"});
  },
  /**
   * returns Object containing codeReview data from Cards collection
   */
  'completed': function() {
    return Cards.find({category: "completed"});
  }
});