import Component from '@ember/component';
import { w } from '@ember/string';
import { computed } from '@ember/object';

export default Component.extend({
  password: null,
  passwordConfirmation: null,

  externalErrors: computed('model.errors.[]', function() {
    let clone = {}

    this.get('model.errors').forEach(function(error){
      clone[error.attribute] = error.message;
    });

    return clone;
  }),

  basicProfileRules: {
    sharedValidations: {
      required: w('username')
    }
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
      this.model.save();
    },

    cancel(){
      this.model.rollbackAttributes();
    },

    cancelPassword(){
      this.setProperties({ password: null, passwordConfirmation: null })
    }
  }
});
