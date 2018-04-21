import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    createUser() {
      this.get('model')
        .save()
        .then(() => {
          this.get('notifications').success('New user successfully created!');
          this.set('model', this.store.createRecord('user'));
        });
    }
  }
});
