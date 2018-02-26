import Component from '@ember/component';
import Object from '@ember/object';
import { w } from '@ember/string';

export default Component.extend({
  rules: {
    sharedValidations: {
      required: w('email password username')
    },

    email: 'email',
    password: 'min(6)'
  }
});
