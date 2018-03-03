import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  queryParams: {
    dateRange: {
      refreshModel: true
    }
  },

  model(params) {
    let [ startDate, endDate ] = params.dateRange.split('|');

    let query = {
      me: true,
      start_date: startDate,
      end_date: endDate
    }

    return this.get('store').query('task', query);
  },

  resetController: function(controller, isExiting) {
    this._super.apply(this, arguments);

    if (isExiting) {
      controller._setDefaultDates();
    }
  }
});
