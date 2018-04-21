import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    afterCreate() {
      this.set('model', this.get('store').createRecord('task'));
    },

    cancel() {
      this.transitionToRoute('dashboard.me.tasks');
    }
  }
});
