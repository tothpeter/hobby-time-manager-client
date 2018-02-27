import { inject as service } from '@ember/service';
import AjaxService from 'ember-ajax/services/ajax';
import { UnauthorizedError } from 'ember-ajax/errors';

export default AjaxService.extend({
  session: service(),

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
