import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.store.createRecord('task');
  },

  actions: {
    willTransition: function() {
      this.get('controller.model').unloadRecord();
    }
  }
});
