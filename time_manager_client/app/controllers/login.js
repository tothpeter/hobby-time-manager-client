import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  session: service(),

  actions: {
    authenticate: function() {
      let { identification, password } = this.getProperties('identification', 'password');

      if (!identification || !password) { return false; }

      this.get('session')
        .authenticate('authenticator:devise', identification, password)
        .catch((response) => {
          alert(response.error);
        });
    }
  }
});
