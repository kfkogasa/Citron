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
});