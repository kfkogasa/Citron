Template.myOverview.events({
  /**
   * redirects to cardDetail template which will display clicked card's info
   */

  "click .card": function() {
    var cardId = this._id;
    //save clicked card's id
    Session.set("selectedCard",cardId);
    Router.go('cardDetails');
  },
  "click .cardIssue": function() {
    var cardId = this._id;
    //save clicked card's id
    Session.set("selectedCard",cardId);
    Router.go('cardDetails');
  }
});

Template.myOverview.helpers({
  /**
   * returns Object containing toDo data from Cards collection that are not issues
   */
  'toDo': function() {
    return Cards.find({category: "toDo", user: Meteor.users.findOne(Meteor.userId()).username, issue: false});
  },
  /**
   * returns Object containing toDo data from Cards collection that are issues
   */
  'toDoIssue': function() {
    return Cards.find({category: "toDo", user: Meteor.users.findOne(Meteor.userId()).username, issue: true});
  },
  /**
   * returns Object containing inProgress data from Cards collection that are not issues
   */
  'inProgress': function() {
    return Cards.find({category: "inProgress", user: Meteor.users.findOne(Meteor.userId()).username, issue: false});
  },
  /**
   * returns Object containing inProgress data from Cards collection that are issues
   */
  'inProgressIssue': function() {
    return Cards.find({category: "inProgress", user: Meteor.users.findOne(Meteor.userId()).username, issue: true});
  },
  /**
   * returns Object containing codeReview data from Cards collection that are not issues
   */
  'codeReview': function() {
    return Cards.find({category: "codeReview", user: Meteor.users.findOne(Meteor.userId()).username, issue: false});
  },
  /**
   * returns Object containing codeReview data from Cards collection that are  issues
   */
  'codeReviewIssue': function() {
    return Cards.find({category: "codeReview", user: Meteor.users.findOne(Meteor.userId()).username, issue: true});
  },
  /**
   * returns Object containing codeReview data from Cards collection
   */
  'completed': function() {
    return Cards.find({category: "completed", user: Meteor.users.findOne(Meteor.userId()).username});
  }
});