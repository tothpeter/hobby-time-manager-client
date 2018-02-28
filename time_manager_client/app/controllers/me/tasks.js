import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: {
    startDate: 'start_date',
    endDate: 'end_date',
  },

  init() {
    this._super();
    this._setDefaultDates();
  },

  dateLimit: moment.duration(3, 'months'),

  actions: {
    setDateRange(newStartDate, newEndDate) {
      this.set('startDate', newStartDate);
      this.set('endDate', newEndDate);
    }
  },

  _setDefaultDates() {
    this.set('startDate', moment().startOf('month').format('YYYY-MM-DD'));
    this.set('endDate', moment().endOf('month').format('YYYY-MM-DD'));
  }
});
