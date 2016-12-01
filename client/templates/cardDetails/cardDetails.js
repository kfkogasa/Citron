Template.cardDetails.helpers({
    /**
     * returns current user assigned to task card if not the current user
     */
    'otherAssigned': function () {
        var cardId = Session.get("selectedCard");
        var username = (Cards.findOne({_id: cardId})).user;

        if (username != Meteor.users.findOne(Meteor.userId()).username) {
            return username;
        }
        else {
            return null;
        }
    }
});

function pad(n) {
    if (n < 10) {
        return ("0" + n.toString());
    } else {
        return n.toString();
    }
}

Template.cardDetails.onRendered(function () {
    /**
     * displays clicked card's current details in form
     */
    var cardId = Session.get("selectedCard");
    var card = Cards.findOne({_id: cardId});
    document.getElementById('name').innerHTML = card.name;
    document.title = card.name;
    if (Cards.findOne({_id: cardId, user: Meteor.users.findOne(Meteor.userId()).username})) {
        document.getElementById('take').checked = true;
    }
    document.getElementById('category').value = String(card.category);
    document.getElementById('cardDescription').innerHTML = card.description;

    var originalstate;
    if (card.issue != false) {
        document.getElementById('issue').checked = true;
    }
        //this.originalstate = true;
    //} else {
    //    document.getElementById('issue').checked = false;
    //    this.originalstate = false;
    //}

    var timer;
    // var time = 0;

    //load current DB time
    var cardTime = card.time;

    document.getElementById('currTime').innerHTML = cardTime;

    var sec = cardTime % 60;
    cardTime = (cardTime - sec) / 60;
    var min = cardTime % 60;
    cardTime = (cardTime - min) / 60;
    var hour = cardTime;

    document.getElementById('currentHour').innerHTML = hour;
    document.getElementById('currentMin').innerHTML = min;
    document.getElementById('currentSec').innerHTML = sec;
});

Template.cardDetails.events({
    "click #start": function () {
        timer = Meteor.setInterval(function () {
            document.getElementById('time').innerHTML = Number(document.getElementById('time').innerHTML) + 1;
            if (document.getElementById('sec').innerHTML == 59) {
                if (document.getElementById('min').innerHTML == 59) {
                    document.getElementById('min').innerHTML = 0;
                    document.getElementById('hour').innerHTML = pad(Number(document.getElementById('hour').innerHTML) + 1);
                }
                else {
                    document.getElementById('min').innerHTML = pad(Number(document.getElementById('min').innerHTML) + 1);
                }
                document.getElementById('sec').innerHTML = 0;
            }
            else {
                document.getElementById('sec').innerHTML = pad(Number(document.getElementById('sec').innerHTML) + 1);
            }
        }, 1000);
    },
    "click #save": function () {
        var cardId = Session.get("selectedCard");
        var card = Cards.findOne({_id: cardId});
        var category = document.getElementById('category').value;
        var description = document.getElementById('cardDescription').value;
        if ((card.user == null) && (document.getElementById('take').checked == true)) {
            var user = Meteor.users.findOne(Meteor.userId());
            user = user.username;
        }
        else {
            var user = null;
        }
        var issue = document.getElementById('issue').checked;
        //if category is 'completed', card can no longer be an issue
        if (category == "completed") {
            issue = false;
        }

        Meteor.call("updateCardDetails", cardId, description, category, card.category, user, issue, card.issue);

        alert("Changes Saved.");
    },
    "click #delete" : function () {
        if (confirm("Are you sure you want to delete this task?")) {
            var cardId = Session.get("selectedCard");
            Cards.remove({_id: cardId});
            Router.go("overview");
        }
    },
    "click #stop": function () {
        //stop timer
        Meteor.clearInterval(timer);
        var cardId = Session.get("selectedCard");
        var time = Number(document.getElementById('time').innerHTML);

        //add time to time in DB
        Meteor.call("updateCardTime", cardId, time);

        //update current time
        var currTime = Number(document.getElementById('currTime').innerHTML);
        currTime = currTime + time;
        document.getElementById('currTime').innerHTML = currTime;
        var newSec = currTime % 60;
        currTime = (currTime - newSec) / 60;
        var newMin = currTime % 60;
        currTime = (currTime - newMin) / 60;
        var newHour = currTime;

        document.getElementById('currentHour').innerHTML = newHour;
        document.getElementById('currentMin').innerHTML = newMin;
        document.getElementById('currentSec').innerHTML = newSec;

        //reset timer
        document.getElementById('time').innerHTML = 0;
        document.getElementById('hour').innerHTML = "00";
        document.getElementById('min').innerHTML = "00";
        document.getElementById('sec').innerHTML = "00";
    }
});