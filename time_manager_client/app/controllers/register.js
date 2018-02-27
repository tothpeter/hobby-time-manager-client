import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  session: service(),

  actions: {
    register() {
      let controller = this;

      this.get('model')
        .save()
        .then(() => {
          let { email, password } = controller.model.getProperties('email', 'password');

          controller.get('session').authenticate('authenticator:devise', email, password);
        });
    }
  }
});
