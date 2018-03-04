import Route from '@ember/routing/route';

export default Route.extend({
  breadCrumb: {},

  afterModel(model) {
    const username = model.get('username');

    const breadCrumb = {
      title: username,
      linkable: false
    };

    this.set('breadCrumb', breadCrumb);
  }
});
