import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Route.extend(ApplicationRouteMixin, {
  currentUser: service(),

  beforeModel() {
    this._setDefaults();
    return this._loadCurrentUser();
  },

  sessionAuthenticated() {
    let parentMethod = this._super.bind(this),
        originalArguments = arguments;

    this._loadCurrentUser().then(() => {
      parentMethod(...originalArguments);
    });
  },

  _loadCurrentUser() {
    return this.get('currentUser').load().catch(() => this.get('session').invalidate());
  },

  _setDefaults() {
    this.get('notifications').setDefaultClearDuration(3600);
    this.get('notifications').setDefaultAutoClear(true);
  }
});
