import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  currentUser: service(),

  filteredUsers: Ember.computed.filter('model', function(user, index, array) {
    return this.get('currentUser.user.id') !== user.get('id');
  }),

  actions: {
    deleteUser(user) {
      if (window.confirm('Are you sure, you want to delete this user?')) {
        user.destroyRecord();
      }
    }
  }
});
