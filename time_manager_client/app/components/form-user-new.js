import Component from '@ember/component';
import { w } from '@ember/string';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  currentUser: service(),
  submitButtonLabel: 'Sign up',

  externalErrors: computed('model.errors.[]', function() {
    let clone = {}

    this.get('model.errors').forEach(function(error){
      clone[error.attribute] = error.message;
    });

    return clone;
  }),

  rules: {
    sharedValidations: {
      required: w('email password passwordConfirmation username preferredWorkingHoursPerDay')
    },

    email: 'email',
    password: 'min(6)',
    passwordConfirmation: 'same(password)',
    preferredWorkingHoursPerDay: 'min(1)'
  }
});
