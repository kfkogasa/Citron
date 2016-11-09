Meteor.methods({
  /**
   * Creates task card entry
   */
  addCard: function(name, description) {
    Cards.insert({
      name: name,
      description: description,
      category: 'toDo',
      user: null,
      issue: false
    });
  }
});