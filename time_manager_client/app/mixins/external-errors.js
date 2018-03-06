import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';

export default Mixin.create({
  externalErrors: computed('model.errors.[]', function() {
    let clone = {},
        errors = this.get('model.errors') || [];

    errors.forEach(function(error){
      clone[error.attribute] = error.message;
    });

    return clone;
  })
});
