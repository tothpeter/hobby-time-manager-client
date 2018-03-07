import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import Object from '@ember/object';

export default Controller.extend({
  currentUser: service(),

  queryParams: ['username', 'email'],

  filteredUsers: computed.filter('model', function(user) {
    return this.get('currentUser.user.id') !== user.get('id');
  }),

  availableFilters: ['email', 'username'],
  filters: Object.create(),

  _setDefaults() {
    if (this.get('username') || this.get('email')) {
      this.set('displayFilters', true);
    }

    let availableFilters = this.get('availableFilters'),
        _this = this;

    availableFilters.forEach(function(filterName) {
      let filterValue = _this.get(filterName);

      _this.get('filters').set(filterName, filterValue);
    });
  },

  _setQueryParamsFromFilters() {
    let availableFilters = this.get('availableFilters'),
        filters = {},
        _this = this;

    availableFilters.forEach(function(filterName) {
      let filterValue = _this.get(`filters.${filterName}`);

      if (filterValue != null) {
        filterValue = filterValue.trim();

        if (filterValue.length === 0) {
          filterValue = null;
        }
      }

      filters[filterName] = filterValue;
    });

    this.setProperties(filters);
  },

  actions: {
    deleteUser(user) {
      if (window.confirm('Are you sure, you want to delete this user?')) {
        user.destroyRecord();
      }
    },

    toggleFilters() {
      this.toggleProperty('displayFilters');
    },

    resetFilters() {
      this.get('filters').setProperties({
        email: null,
        username: null
      });
      this._setQueryParamsFromFilters();
      this.send('refresh');
    },

    filter() {
      this._setQueryParamsFromFilters();
      this.send('refresh');
    }
  }
});
