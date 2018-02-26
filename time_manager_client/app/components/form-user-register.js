import Component from '@ember/component';
import Object from '@ember/object';
import { w } from '@ember/string';
import { computed } from '@ember/object';

export default Component.extend({
  externalErrors: computed('model.errors.[]', function() {
    let clone = {}

    this.get('model.errors').forEach(function(error){
      clone[error.attribute] = error.message;
    });

    return clone;
  }),

  rules: {
    sharedValidations: {
      required: w('email password username')
    },

    email: 'email',
    password: 'min(6)'
  }
});
