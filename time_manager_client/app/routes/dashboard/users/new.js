import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  model() {
    return this.store.createRecord('user');
  },

  actions: {
    willTransition: function() {
      this.get('controller.model').unloadRecord();
    }
  }
});
