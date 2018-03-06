import Component from '@ember/component';
import { w } from '@ember/string';
import { inject as service } from '@ember/service';
import ExternalErrorMixin from 'time-manager-client/mixins/external-errors';

export default Component.extend(ExternalErrorMixin, {
  currentUser: service(),
  submitButtonLabel: 'Sign up',

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
