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

  this.route('me.tasks', { path: 'me/tasks' });
  this.route('me.tasks.new', { path: 'me/tasks/new' });
  this.route('me.tasks.task.edit', { path: 'me/tasks/:task_id/edit' });

  this.route('users');
  this.route('users.new', { path: 'users/new' });
  this.route('users.user.edit', { path: 'users/:user_id/edit' });
  this.route('users.user.tasks', { path: 'users/:user_id/tasks' });
});

export default Router;
