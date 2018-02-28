import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: {
    dateStart: 'date_start',
    dateEnd: 'date_end',
  },

  dateStart: moment().startOf('month').format('YYYY-MM-DD'),
  dateEnd: moment().endOf('month').format('YYYY-MM-DD'),

  actions: {
    changeStartDate(selectedDate) {
      this.set('dateStart', moment(selectedDate).format('YYYY-MM-DD'));
    },

    changeEndDate(selectedDate) {
      this.set('dateEnd', moment(selectedDate).format('YYYY-MM-DD'));
    }
  }
});
