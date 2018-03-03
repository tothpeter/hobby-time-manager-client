import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    let task = this.store.createRecord('task');

    return this.get('store').findRecord('user', params.user_id).then(function(user) {
      task.set('user', user);

      return {
        task: task,
        user: user
      };
    });
  },

  actions: {
    willTransition: function() {
      this.get('controller.model.task').unloadRecord();
    }
  }
});
