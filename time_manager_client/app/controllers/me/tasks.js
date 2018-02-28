import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: {
    startDate: 'start_date',
    endDate: 'end_date',
  },

  startDate: moment().startOf('month').format('YYYY-MM-DD'),
  endDate: moment().endOf('month').format('YYYY-MM-DD'),

  actions: {
    changeStartDate(selectedDate) {
      this.set('startDate', moment(selectedDate).format('YYYY-MM-DD'));
    },

    changeEndDate(selectedDate) {
      this.set('endDate', moment(selectedDate).format('YYYY-MM-DD'));
    }
  }
});
