import Route from '@ember/routing/route';
import { CanMixin } from 'ember-can';

export default Route.extend(CanMixin, {
  beforeModel: function() {
    if (!this.can('manage users')) {
      this.transitionTo('application');
    }
  }
});
