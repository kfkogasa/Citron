Meteor.methods({
  /**
   * Creates task card entry
   */
  addCard: function (name, description) {
    Cards.insert({
      name: name,
      description: description,
      category: 'toDo',
      user: null,
      issue: false,
      time: 0
    });
  },

  /**
   * Updates time for card
   */
  updateCardTime: function (id, time) {
    Cards.update({_id: id}, {
      $inc: {
        time: time
      }
    });
  }
});