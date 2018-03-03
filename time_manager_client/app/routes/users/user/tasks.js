import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RSVP from 'rsvp';

export default Route.extend(AuthenticatedRouteMixin, {
  queryParams: {
    dateRange: {
      refreshModel: true
    }
  },

  model(params) {
    let [ startDate, endDate ] = params.dateRange.split('|');

    let query = {
      user_id: params.user_id,
      start_date: startDate,
      end_date: endDate
    }

    return RSVP.hash({
      tasks: this.store.query('task', query),
      user: this.store.findRecord('user', params.user_id)
    });
  },

  resetController: function(controller, isExiting) {
    this._super.apply(this, arguments);

    if (isExiting) {
      controller._setDefaultDates();
    }
  }
});
