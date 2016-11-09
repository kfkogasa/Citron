Template.addCard.events({
  "click #save": function () {
    var name = document.getElementById("cardName").value;
    var description = document.getElementById("cardDescription").value;
    if (name != "" && description != "") {
      //add new card to DB
      Meteor.call("addCard", name, description);
    }
  }
});