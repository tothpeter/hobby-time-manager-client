import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login');
  this.route('register');

  this.route('me', function() {
    this.route('tasks', function() {
      this.route('new');
      this.route('task.edit', { path: ':task_id/edit' });
    });
  });

  this.route('users', function() {
    this.route('new');
    this.route('user', { path: ':user_id' }, function() {
      this.route('edit');
    });
  });

  this.route('users.user.tasks', { path: 'users/:user_id/tasks' });
  this.route('users.user.tasks.new', { path: 'users/:user_id/tasks/new' });
  this.route('users.user.tasks.task.edit', { path: 'users/:user_id/tasks/:task_id/edit' });
});

export default Router;
