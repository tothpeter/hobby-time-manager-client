import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import config from '../config/environment';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  authorizer: 'authorizer:application',
  host: config.apiHost,

  urlForQuery(query) {
    if (query.me) {
      delete query.me;

      let newUrl = this._insertNamespaceAfterHost(this._super(...arguments), 'me');

      return newUrl;
    }

    return this._super(...arguments);
  },

  urlForFindRecord(id, modelName, snapshot) {
    if (snapshot.adapterOptions && snapshot.adapterOptions.me) {
      delete snapshot.adapterOptions.me;

      let newUrl = this._insertNamespaceAfterHost(this._super(...arguments), 'me');
      return newUrl;
    }

    return this._super(...arguments);
  },

  urlForCreateRecord(_, snapshot) {
    if (snapshot.adapterOptions && snapshot.adapterOptions.me) {
      delete snapshot.adapterOptions.me;

      let newUrl = this._insertNamespaceAfterHost(this._super(...arguments), 'me');
      return newUrl;
    }

    return this._super(...arguments);
  },

  urlForUpdateRecord(_id, _modelName, snapshot) {
    if (snapshot.adapterOptions && snapshot.adapterOptions.me) {
      delete snapshot.adapterOptions.me;

      let newUrl = this._insertNamespaceAfterHost(this._super(...arguments), 'me');
      return newUrl;
    }

    return this._super(...arguments);
  },

  urlForDeleteRecord(_, __, snapshot) {
    if (snapshot.adapterOptions && snapshot.adapterOptions.me) {
      delete snapshot.adapterOptions.me;

      let newUrl = this._insertNamespaceAfterHost(this._super(...arguments), 'me');
      return newUrl;
    }

    return this._super(...arguments);
  },

  _insertNamespaceAfterHost: function(builtUrl, namespace) {
    let host = this.get('host');
    let indexOfBreakPoint = builtUrl.indexOf(host) + host.length;

    let firstPart  = builtUrl.substr(0, indexOfBreakPoint);
    let secondPart = builtUrl.substr(indexOfBreakPoint + 1);

    return `${firstPart}/${namespace}/${secondPart}`;
  }
});
