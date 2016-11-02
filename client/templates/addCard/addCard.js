Template.addCard.events({
  "click #save": function () {
    var name = document.getElementById("cardName").value;
    var description = document.getElementById("cardDescription").value;
    if (name != "" && description != "") {
      Meteor.call("addCard", name, description); //add new card to DB
      //redirect to overview
      Router.go('overview');
    }
  },
})
;