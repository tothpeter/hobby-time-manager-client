import { inject as service } from '@ember/service';
import AjaxService from 'ember-ajax/services/ajax';
import { UnauthorizedError } from 'ember-ajax/errors';
import config from '../config/environment';

export default AjaxService.extend({
  session: service(),
  host: config.apiHost,

  // TODO: refactor: remove header settings from request, the code below generates some wierd errors in a completely different part of the app
  // headers: computed('session.data.authenticated.{token, email}', {
  //   get() {
  //     let headers = {};
  //
  //     this.get('session').authorize('authorizer:application', (headerName, headerValue) => {
  //       headers[headerName] = headerValue;
  //     });
  //
  //     return headers;
  //   }
  // }),

  request(url, options) {
    this.get('session').authorize('authorizer:application', (headerName, headerValue) => {
      this.set(`headers.${headerName}`, headerValue);
    });

    return this._super(url, options).
      catch((error) => {
        if (error instanceof UnauthorizedError) {
          if (this.get('session.isAuthenticated')) {
            this.get('session').invalidate();
          }
        }
        else {
          throw error;
        }
      });
  }
});
