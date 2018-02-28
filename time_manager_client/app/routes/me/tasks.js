import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  queryParams: {
    dateStart: {
      refreshModel: true
    },
    dateEnd: {
      refreshModel: true
    }
  },

  model(params) {
    let query = {
      own: true,
      start_date: params.dateStart,
      end_date: params.dateEnd
    }

    return this.get('store').query('task', query);
  }
});
