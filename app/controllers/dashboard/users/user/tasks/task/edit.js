import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    cancel() {
      let userId = this.get('model.user.id');

      this.transitionToRoute('dashboard.users.user.tasks', userId);
    }
  }
});
