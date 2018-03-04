import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    let options = {
      adapterOptions: {
        me: true
      }
    }

    return this.store.findRecord('task', params.task_id, options);
  },

  actions: {
    willTransition: function() {
      this.get('controller.model').rollbackAttributes();
    }
  }
});
