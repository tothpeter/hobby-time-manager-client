import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  currentUser: service(),

  actions: {
    willTransition: function() {
      this.get('currentUser.user').rollbackAttributes();
    }
  }
});
