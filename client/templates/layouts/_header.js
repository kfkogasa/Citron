Template._header.events({
    'click .logout': function (event) {
        event.preventDefault();
        Meteor.logout();
    }
});