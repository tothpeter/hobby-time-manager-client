import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import FileSaverMixin from 'ember-cli-file-saver/mixins/file-saver';

export default Controller.extend(FileSaverMixin, {
  ajax: service(),

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
    },

    export() {
      let payload = {
        dataType: 'text',
        data: {
          start_date: this.get('startDate'),
          end_date: this.get('endDate')
        }
      };

      this.get('ajax').request('/me/tasks/export', payload).then((content) => {
        let { startDate, endDate } = this.getProperties('startDate', 'endDate');
        let fileName = `tasks_export_${startDate}_${endDate}.html`;

        this.saveFileAs(fileName, content, 'text/html');
      });
    }
  },

  _setDefaultDates() {
    let startDate = moment().startOf('month').format('YYYY-MM-DD'),
        endDate   = moment().endOf('month').format('YYYY-MM-DD');

    this.set('dateRange', `${startDate}|${endDate}`);
  }
});
