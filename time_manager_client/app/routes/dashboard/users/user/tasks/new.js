import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    let user = this.modelFor('dashboard.users.user'),
        task = this.store.createRecord('task', { user: user });

    return {
      user: user,
      task: task
    };
  },

  actions: {
    willTransition: function() {
      this.get('controller.model.task').unloadRecord();
    }
  }
});
