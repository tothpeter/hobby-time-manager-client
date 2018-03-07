import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    let query = {},
        filters = {};

    let availableFilters = ['email', 'username'];

    availableFilters.forEach(function(filter) {
      if (params[filter]) {
        filters[filter] = params[filter];
      }
    });

    if (filters) {
      query.filter = filters;
    }

    return this.get('store').query('user', query);
  },

  actions: {
    refresh() {
      this.refresh();
    },

    didTransition() {
      this.controller._setDefaults();
    }
  }
});
