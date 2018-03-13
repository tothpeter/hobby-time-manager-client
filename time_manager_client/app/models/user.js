import DS from 'ember-data';
import { hasMany } from 'ember-data/relationships';

export default DS.Model.extend({
  tasks: hasMany(),

  email: DS.attr(),
  password: DS.attr(),
  username: DS.attr(),
  firstName: DS.attr(),
  lastName: DS.attr(),
  preferredWorkingHoursPerDay: DS.attr('number'),
  accessLevel: DS.attr()
});
