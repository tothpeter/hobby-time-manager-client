import Devise from 'ember-simple-auth/authenticators/devise';
import config from '../config/environment';
import { inject as service } from '@ember/service';

export default Devise.extend({
  ajax: service(),

  serverTokenEndpoint: `${config.apiHost}/sessions`,

  invalidate: function() {
    return this.get('ajax').delete('/sessions');
  }
});
