import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  authorizer: 'authorizer:application',

  urlForQuery(query) {
    if (query.own) {
      delete query.own;

      return `/me${this._super(...arguments)}`;
    }

    return this._super(...arguments);
  },

  urlForFindRecord(id, modelName, snapshot) {
    if (snapshot.adapterOptions && snapshot.adapterOptions.me) {
      delete snapshot.adapterOptions.me;
      return `/me${this._super(...arguments)}`;
    }

    return this._super(...arguments);
  },

  urlForCreateRecord(_, snapshot) {
    if (snapshot.adapterOptions && snapshot.adapterOptions.me) {
      delete snapshot.adapterOptions.me;
      return `/me${this._super(...arguments)}`;
    }

    return this._super(...arguments);
  },

  urlForUpdateRecord(_id, _modelName, snapshot) {
    if (snapshot.adapterOptions && snapshot.adapterOptions.me) {
      delete snapshot.adapterOptions.me;
      return `/me${this._super(...arguments)}`;
    }

    return this._super(...arguments);
  }
});
