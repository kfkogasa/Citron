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

    /*
    count: function () {
        function Day(day) {
            this.day = day;
            this.toDo = 0;
            this.inProgress = 0;
            this.codeReview = 0;

        }
        var changes = Changes.find().fetch();

        var dates = [];
        dates.contains = function (dayString) {
            var hasItem = false;

            dates.forEach(function (element) {
                if (element.day == dayString) {
                    hasItem = true;
                }
            });
            return hasItem;
        }
        dates.indexOfDate = function (dayString) {
            if (!dates.contains(dayString)) {
                return -1;
            } else {
                var index = 0;
                var foundIndex = -1;

                dates.forEach(function (element) {
                    if (element.day == dayString) {
                        foundIndex = index;
                    }
                    index++;
                });

                return foundIndex;
            }
        }

        changes.forEach(function (element) {
            if (!dates.contains(element.date)) {
                dates.push(new Day(element.date));

                if (dates.indexOfDate(element.date) > 0) {
                    var prevIndex = dates.indexOfDate(element.date) - 1;
                    dates[prevIndex + 1].toDo = dates[prevIndex].toDo;
                    dates[prevIndex + 1].inProgress = dates[prevIndex].inProgress;
                    dates[prevIndex + 1].codeReview = dates[prevIndex].codeReview;
                }
            }

            var currentIndex = dates.indexOfDate(element.date);

            if (element.category == "toDo") {
                dates[currentIndex].toDo = dates[currentIndex].toDo + element.increment;
            } else if (element.category == "inProgress") {
                dates[currentIndex].inProgress = dates[currentIndex].inProgress + element.increment;
            } else {
                dates[currentIndex].codeReview = dates[currentIndex].codeReview + element.increment;
            }
        });

        return dates;
    },
*/
    /**
     * Updates card details
     */
    updateCardDetails: function (id, description, category, user, issue) {

        Cards.update({_id: id}, {
            $set: {
                description: description,
                category: category,
                user: user,
                issue: issue,
            },
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