import Component from '@ember/component';
import { w } from '@ember/string';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  notifications: service('notification-messages'),
  store: service(),
  me: true,
  adapterParams: computed('me', function() {
    if (this.get('me')) {
      return {
        adapterOptions: {
          me: true
        }
      };
    } else {
      return {};
    }
  }),

  init() {
    this._super(...arguments);

    if (this.get('createForm')) {
      this.set('label', 'Create');
      this.set('model.date', new Date());
    } else {
      this.set('label', 'Update');
    }
  },

  createForm: true,

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
      this.model.save(this.get('adapterParams')).then(() => {

        this.get('notifications').success(`${this.get('label')} successfully!`);

        if (this.get('createForm')) {
          this.set('model', this.get('store').createRecord('task'));
        }
      });
    },

    cancel() {
      this.model.rollbackAttributes();
    }
  }
});
