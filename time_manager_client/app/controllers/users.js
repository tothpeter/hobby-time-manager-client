import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    deleteUser(user) {
      if (window.confirm('Are you sure, you want to delete this user?')) {
        user.destroyRecord();
      }
    }
  }
});
