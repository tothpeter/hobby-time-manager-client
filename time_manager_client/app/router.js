import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login');
  this.route('register');

  this.route('dashboard', { path: '' }, function() {
    this.route('me', function() {
      this.route('tasks', function() {
        this.route('new');
        this.route('task', { path: ':task_id' }, function() {
          this.route('edit');
        });
      });
    });

    this.route('users', function() {
      this.route('new');
      this.route('user', { path: ':user_id' }, function() {
        this.route('edit');
        this.route('tasks', function() {
          this.route('new');
          this.route('task', { path: ':task_id' }, function() {
            this.route('edit');
          });
        });
      });
    });
  });
});

export default Router;
