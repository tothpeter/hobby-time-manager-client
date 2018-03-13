import Route from '@ember/routing/route';

export default Route.extend({
  breadCrumb: {},

  afterModel(model) {
    const title = model.get('title');

    const breadCrumb = {
      title: title,
      linkable: false
    };

    this.set('breadCrumb', breadCrumb);
  }
});
