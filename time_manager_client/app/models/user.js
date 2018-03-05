import DS from 'ember-data';
import { hasMany } from 'ember-data/relationships';
import { computed } from '@ember/object';

export default DS.Model.extend({
  tasks: hasMany(),

  email: DS.attr(),
  password: DS.attr(),
  username: DS.attr(),
  firstName: DS.attr(),
  lastName: DS.attr(),
  preferredWorkingHoursPerDay: DS.attr('number'),
  accessLevel: DS.attr(),

  isAdmin: computed('accessLevel', function() {
    return this.get('accessLevel') === 'admin';
  }),

  isManager: computed('accessLevel', function() {
    return this.get('accessLevel') === 'manager';
  }),

  isEmployee: computed('accessLevel', function() {
    return this.get('accessLevel') === 'employee';
  })

});
