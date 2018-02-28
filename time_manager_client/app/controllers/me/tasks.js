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

  actions: {
    changeStartDate(selectedDate) {
      this.set('startDate', moment(selectedDate).format('YYYY-MM-DD'));
    },

    changeEndDate(selectedDate) {
      this.set('endDate', moment(selectedDate).format('YYYY-MM-DD'));
    },

    filterForCurrentWeek() {
      this.set('startDate', moment().startOf('week').format('YYYY-MM-DD'));
      this.set('endDate', moment().endOf('week').format('YYYY-MM-DD'));
    },

    filterForCurrentMonth() {
      this._setDefaultDates();
    }
  },

  _setDefaultDates() {
    this.set('startDate', moment().startOf('month').format('YYYY-MM-DD'));
    this.set('endDate', moment().endOf('month').format('YYYY-MM-DD'));
  }
});
