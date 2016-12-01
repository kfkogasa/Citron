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

    addChange: function (date, category, increment) {
        Changes.insert({
            date: date,
            category: category,
            increment: increment,
        });
    },

    count: function () {
        console.log(Changes.find().fetch());
    },

    /**
     * Updates card details
     */
    updateCardDetails: function (id, description, category, wasCategory, user, issue, hadIssue) {

        var date = (new Date).toDateString(); //TODO DEBUG datestamp

        //--logIssueChange--

        if ((category != wasCategory) && (issue != hadIssue)) {
            console.log(wasCategory + " --> " + category);
            console.log("issue state changed!");
            if (issue == true) {
                Meteor.call("addChange", date, category, 1);
            }
            if (issue == false) {
                Meteor.call("addChange", date, wasCategory, -1);
            }
        } else if (category != wasCategory) {
            console.log(wasCategory + " --> " + category);
            if (hadIssue == true) {
                Meteor.call("addChange", date, wasCategory, -1);
                Meteor.call("addChange", date, category, 1);
            }
            if (category == "completed") {
                Meteor.call("addChange", date, wasCategory, -1);
            }
        } else if (issue != hadIssue) {
            console.log("issue state changed!");
            if (issue == true) {
                Meteor.call("addChange", date, category, 1);
            }
            else {
                Meteor.call("addChange", date, category, -1);
            }
        } else {
            console.log("category and issue state remained unchanged!");
        }

        Meteor.call("count");

        Cards.update({_id: id}, {
            $set: {
                description: description,
                category: category,
                user: user,
                issue: issue,
            },

        });

        //get today's server date
        //if today's date is different, transfer from previous entry

        if (issue == true) {
            //Console.log("true");
            //if true, increment
        } else {
            //Console.log("false");
        }
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