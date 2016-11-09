Template.cardDetails.onRendered(function () {
  /**
   * displays clicked card's current details in form
   */
  var cardId = Session.get("selectedCard");
  var card = Cards.findOne({_id: cardId});
  document.getElementById('name').innerHTML = card.name;
  document.getElementById('category').value = String(card.category);
  document.getElementById('cardDescription').innerHTML = card.description;
  if (card.user != null) {
    document.getElementById('user').innerHTML = card.user;
  }
  if (card.issue != false) {
    document.getElementById('issue').checked = true;
  }

  var timer;
 // var time = 0;
});

Template.cardDetails.events({
  "click #start": function () {
    timer = Meteor.setInterval(function () {
      document.getElementById('time').innerHTML = Number(document.getElementById('time').innerHTML) + 1;
      if(document.getElementById('sec').innerHTML == 59) {
        if(document.getElementById('min').innerHTML == 59) {
          document.getElementById('min').innerHTML = 0;
          document.getElementById('hour').innerHTML = Number(document.getElementById('hour').innerHTML) + 1;
        }
        else {
          document.getElementById('min').innerHTML = Number(document.getElementById('min').innerHTML) + 1;
        }
        document.getElementById('sec').innerHTML = 0;
      }
      else {
        document.getElementById('sec').innerHTML = Number(document.getElementById('sec').innerHTML) + 1;
      }
    }, 1000);
  },

  "click #stop": function () {
    //stop timer
    Meteor.clearInterval(timer);
    var cardId = Session.get("selectedCard");
    console.log(cardId);
    var time = Number(document.getElementById('time').innerHTML);
    //add time to time in DB
    Meteor.call("updateCardTime", cardId, time);
  }
});