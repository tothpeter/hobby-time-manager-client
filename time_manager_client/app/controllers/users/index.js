import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Controller.extend({
  currentUser: service(),

  filteredUsers: computed.filter('model', function(user) {
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
