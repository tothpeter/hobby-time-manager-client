import { Ability } from 'ember-can';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Ability.extend({
  currentUserService: service('currentUser'),
  currentUser: computed('currentUserService.user', function() {
    return this.get('currentUserService.user');
  }),

  canManage: computed('currentUser.accessLevel', function() {
    return this.get('currentUser.isAdmin');
  })
});
