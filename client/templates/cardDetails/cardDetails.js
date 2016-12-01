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

    var timer;

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

        //vars for issue collection updates
        var prevIssue = card.issue;
        var prevCategory = card.category;
        var currDate = new Date();
        currDate = currDate.toLocaleDateString();

        Meteor.call("updateCardDetails", cardId, description, category, user, issue);

        //if issue found, add 1 to issue count for that category
        if ((prevIssue == false) && (issue == true)) {
            //issue change in toDo
            if (category == "toDo") {
                Meteor.call("updateIssues", currDate, 1, 0, 0, 0);
            }
            //issue change in inProgress
            else if (category == "inProgress") {
                Meteor.call("updateIssues", currDate, 0, 1, 0, 0);
            }
            //issue change in codeReview
            else if (category == "codeReview") {
                Meteor.call("updateIssues", currDate, 0, 0, 1, 0);
            }
            //issue change in completed -- though this should not happen (if there is an issue it is not completed)
            else if (category == "completed") {
                Meteor.call("updateIssues", currDate, 0, 0, 0, 1);
            }
        }
        //else if issue resolved, decrement previous category count
        else if ((prevIssue == true) && (issue == false)) {
            //issue change in toDo
            if (prevCategory == "toDo") {
                Meteor.call("updateIssues", currDate, -1, 0, 0, 0);
            }
            //issue change in inProgress
            else if (prevCategory == "inProgress") {
                Meteor.call("updateIssues", currDate, 0, -1, 0, 0);
            }
            //issue change in codeReview
            else if (prevCategory == "codeReview") {
                Meteor.call("updateIssues", currDate, 0, 0, -1, 0);
            }
            //issue change in completed -- though this should not happen (if there is an issue it is not completed)
            else if (prevCategory == "completed") {
                Meteor.call("updateIssues", currDate, 0, 0, 0, -1);
            }
        }
        //else if issue moved from one category to another
        else if ((prevIssue == true) && (issue == true)) {
            //issue change from toDo to inProgress
            if ((prevCategory == "toDo") && (category == "inProgress")) {
                Meteor.call("updateIssues", currDate, -1, 1, 0, 0);
            }
            //issue change from toDo to codeReview -- should not happen
            else if ((prevCategory == "toDo") && (category == "codeReview")) {
                Meteor.call("updateIssues", currDate, -1, 0, 1, 0);
            }
            //issue change from toDo to completed -- should not happen
            else if ((prevCategory == "toDo") && (category == "completed")) {
                Meteor.call("updateIssues", currDate, -1, 0, 0, 1);
            }
            //issue change from inProgress to toDo
            else if ((prevCategory == "inProgress") && (category == "toDo")) {
                Meteor.call("updateIssues", currDate, 1, -1, 0, 0);
            }
            //issue change from inProgress to codeReview
            else if ((prevCategory == "inProgress") && (category == "codeReview")) {
                Meteor.call("updateIssues", currDate, 0, -1, 1, 0);
            }
            //issue change from inProgress to completed -- should not happen
            else if ((prevCategory == "inProgress") && (category == "completed")) {
                Meteor.call("updateIssues", currDate, 0, -1, 0, 1);
            }
            //issue change from codeReview to toDo
            else if ((prevCategory == "codeReview") && (category == "toDo")) {
                Meteor.call("updateIssues", currDate, 1, 0, -1, 0);
            }
            //issue change from codeReview to inProgress
            else if ((prevCategory == "codeReview") && (category == "inProgress")) {
                Meteor.call("updateIssues", currDate, 0, 1, -1, 0);
            }
            //issue change from codeReview to completed -- should not happen
            else if ((prevCategory == "codeReview") && (category == "completed")) {
                Meteor.call("updateIssues", currDate, 0, 0, -1, 1);
            }
            /**
             * the rest of these should not happen because there should be no issues in the completed category
             */
            //issue change from completed to toDo
            else if ((prevCategory == "completed") && (category == "toDo")) {
                Meteor.call("updateIssues", currDate, 1, 0, 0, -1);
            }
            //issue change from completed to inProgress
            else if ((prevCategory == "completed") && (category == "inProgress")) {
                Meteor.call("updateIssues", currDate, 0, 1, 0, -1);
            }
            //issue change from completed to codeReview
            else if ((prevCategory == "completed") && (category == "codeReview")) {
                Meteor.call("updateIssues", currDate, 0, 0, 1, -1);
            }
        }
        //alert("Changes Saved");
    },
    "click #delete": function () {
        if (confirm("Are you sure you want to delete this task?")) {
            var cardId = Session.get("selectedCard");

            //vars for issue collection updates
            var category = Cards.findOne({_id: cardId}).category;
            var currDate = new Date();
            currDate = currDate.toLocaleDateString();

            if (Cards.findOne({_id: cardId}).issue) {
                //issue change in toDo
                if (category == "toDo") {
                    Meteor.call("updateIssues", currDate, -1, 0, 0, 0);
                }
                //issue change in inProgress
                else if (category == "inProgress") {
                    Meteor.call("updateIssues", currDate, 0, -1, 0, 0);
                }
                //issue change in codeReview
                else if (category == "codeReview") {
                    Meteor.call("updateIssues", currDate, 0, 0, -1, 0);
                }
                //issue change in completed -- though this should not happen (if there is an issue it is not completed)
                else if (category == "completed") {
                    Meteor.call("updateIssues", currDate, 0, 0, 0, -1);
                }
            }

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