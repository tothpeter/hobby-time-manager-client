import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  queryParams: {
    startDate: {
      refreshModel: true
    },
    endDate: {
      refreshModel: true
    }
  },

  model(params) {
    let query = {
      own: true,
      start_date: params.startDate,
      end_date: params.endDate
    }

    return this.get('store').query('task', query);
  }
});
