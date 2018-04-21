import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  notifications: service('notification-messages'),
  router: service(),
  me: true,

  actions: {
    deleteTask() {
      if (window.confirm('Are you sure, you want to delete this task?')) {
        let userId = this.get('model.user.id');

        this.model.destroyRecord(this._adapterParams()).then(() => {
          if (this.get('me')) {
            this.get('router').transitionTo('dashboard.me.tasks')
          } else {
            this.get('router').transitionTo('dashboard.users.user.tasks', userId)
          }

          this.get('notifications').success('Task has been deleted');
        });
      }
    }
  },

  _adapterParams: function() {
    if (this.get('me')) {
      return {
        adapterOptions: {
          me: true
        }
      };
    } else {
      return {};
    }
  }
});
