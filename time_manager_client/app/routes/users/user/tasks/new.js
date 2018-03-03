import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    let user = this.modelFor('users.user'),
        task = this.store.createRecord('task', { user: user });

    return {
      user: user,
      task: task
    };
  },

  actions: {
    willTransition: function() {
      this.get('controller.model.task').unloadRecord();
    }
  }
});
