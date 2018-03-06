import Component from '@ember/component';
import { w } from '@ember/string';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  notifications: service('notification-messages'),
  ajax: service(),
  currentUser: service(),

  externalErrors: computed('model.errors.[]', function() {
    let clone = {}

    this.get('model.errors').forEach(function(error){
      clone[error.attribute] = error.message;
    });

    return clone;
  }),

  basicProfileRules: {
    sharedValidations: {
      required: w('email username preferredWorkingHoursPerDay')
    },

    preferredWorkingHoursPerDay: 'min(1)',
    email: 'email'
  },

  passwordRules: {
    sharedValidations: {
      required: w('password passwordConfirmation')
    },

    password: 'min(6)',
    passwordConfirmation: 'same(password)'
  },

  actions: {
    updateProfile() {
      this.model.save().then(() => {
        this.get('notifications').success('Updated successfully!');
      });
    },

    resetProfile() {
      this.model.rollbackAttributes();
    },

    changePassword() {
      let payload = {
        data: {
          password: this.get('password')
        }
      };

      this.get('ajax').patch(`/users/${this.model.id}/password`, payload).then(() => {
        this.setProperties({ password: null, passwordConfirmation: null });
        this.get('notifications').success('Password updated successfully!');
      });
    }
  }
});
