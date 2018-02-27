import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login');
  this.route('register');
  this.route('me');
  this.route('users');

  this.route('users.user.edit', { path: 'users/:user_id/edit' });
});

export default Router;
