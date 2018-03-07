import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('nl2br', 'helper:nl2br', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('inputValue', '1234');

  this.render(hbs`{{nl2br inputValue}}`);

  assert.equal(this.$().text().trim(), '1234');
});
