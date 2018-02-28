import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  queryParams: {
    dateRange: 'date_range',
  },

  startDate: computed('dateRange', function() {
    return this.get('dateRange').split('|')[0];
  }),

  endDate: computed('dateRange', function() {
    return this.get('dateRange').split('|')[1];
  }),

  init() {
    this._super();
    this._setDefaultDates();
  },

  dateLimit: moment.duration(3, 'months'),

  actions: {
    setDateRange(startDate, endDate) {
      this.set('dateRange', `${startDate}|${endDate}`);
    }
  },

  _setDefaultDates() {
    let startDate = moment().startOf('month').format('YYYY-MM-DD'),
        endDate   = moment().endOf('month').format('YYYY-MM-DD');

    this.set('dateRange', `${startDate}|${endDate}`);
  }
});
