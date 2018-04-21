import Route from '@ember/routing/route';

export default Route.extend({
  breadCrumb: {},

  model(params) {
    let options = {
      adapterOptions: {
        me: true
      }
    }

    return this.store.findRecord('task', params.task_id, options);
  },

  afterModel(model) {
    const title = model.get('title');

    const breadCrumb = {
      title: title
    };

    this.set('breadCrumb', breadCrumb);
  }
});
