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
      required: w('title')
    },

    duration: 'min(1)'
  },

  actions: {
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
