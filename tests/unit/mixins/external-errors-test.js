import EmberObject from '@ember/object';
import ExternalErrorsMixin from 'time-manager-client/mixins/external-errors';
import { module, test } from 'qunit';

module('Unit | Mixin | external errors');

// Replace this with your real tests.
test('it works', function(assert) {
  let ExternalErrorsObject = EmberObject.extend(ExternalErrorsMixin);
  let subject = ExternalErrorsObject.create();
  assert.ok(subject);
});
