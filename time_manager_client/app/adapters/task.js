import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  urlForQuery(query) {
    if (query.own) {
      delete query.own;

      return `/me${this._super(...arguments)}`;
    }

    return this._super(...arguments);
  }
});
