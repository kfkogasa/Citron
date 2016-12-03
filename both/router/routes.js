/**
 * Routes for all tabs
 */

Router.route('/', {
  name: 'home'
});
Router.route('/overview', {
  name: 'overview'
});
Router.route('/myOverview', {
  name: 'myOverview'
});
Router.route('/graph', {
  name: 'graph'
});
Router.route('/addCard', {
  name: 'addCard'
});
Router.route('/cardDetails', {
  name: 'cardDetails'
});
Router.route('/sign-up', {
  name: 'atSignUp',
  redirect: 'atSignIn'
});

/**
 * Users must be logged in to view myOverview, cardDetails, and addCard pages
 */
Router.plugin('ensureSignedIn', {
  only: ['myOverview', 'cardDetails', 'addCard']
});