import DS from 'ember-data';
import { belongsTo } from 'ember-data/relationships';

export default DS.Model.extend({
  user: belongsTo(),

  title: DS.attr(),
  description: DS.attr(),
  date: DS.attr('date'),
  duration: DS.attr('number')
});
