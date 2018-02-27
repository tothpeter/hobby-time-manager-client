import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  session: service(),

  actions: {
    register() {
      this.get('model')
        .save()
        .then(() => {
          let { email, password } = this.model.getProperties('email', 'password');

          this.get('session').authenticate('authenticator:devise', email, password).then(() => {
            this.get('notifications').success('Successful sign up!');
          });
        });
    }
  }
});
