import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RSVP from 'rsvp';

export default Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    return RSVP.hash({
      task: this.store.createRecord('task', {userId: params.user_id}),
      user: this.store.find('user', params.user_id)
    });
  },

  actions: {
    willTransition: function() {
      this.get('controller.model.task').unloadRecord();
    }
  }
});
