import Component from '@ember/component';
import { w } from '@ember/string';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  notifications: service('notification-messages'),

  externalErrors: computed('model.errors.[]', function() {
    let clone = {}

    this.get('model.errors').forEach(function(error){
      clone[error.attribute] = error.message;
    });

    return clone;
  }),

  rules: {
    sharedValidations: {
      required: w('title date')
    },

    duration: 'min(1)'
  },

  actions: {
    updateDate(newDate) {
      // We need this hack because, date type
      this.model.set('date', moment(newDate + 'T01').toDate());
    },

    submit() {
      this.model.save({adapterOptions:{me: true}}).then(() => {
        this.get('notifications').success('Updated successfully!');
      });
    },

    cancel() {
      this.model.rollbackAttributes();
    },
  }
});
