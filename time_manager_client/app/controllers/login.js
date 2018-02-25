import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  session: service(),

  actions: {
    authenticate: function() {
      let { identification, password } = this.getProperties('identification', 'password');

      if (!identification || !password) { return false; }

      let _this = this;

      this.get('session').authenticate('authenticator:devise', identification, password).then(function() {
        _this.transitionToRoute('application');
      }, function(response) {
        alert(response.error);
      });
    }
  }
});
