import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    return this.store.findRecord('task', params.task_id);
  },

  actions: {
    willTransition: function() {
      this.get('controller.model').rollbackAttributes();
    }
  }
});
