import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    afterCreate() {
      let userId = this.get('model.user.id'),
          newTask = this.get('store').createRecord('task', {userId: userId})

      this.set('model.task', newTask);
    },

    cancel() {
      let userId = this.get('model.user.id');

      this.transitionToRoute('dashboard.users.user.tasks', userId);
    }
  }
});
