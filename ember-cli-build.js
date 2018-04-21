'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let env = EmberApp.env() || 'development';
  let isProductionLikeBuild = ['production', 'staging'].indexOf(env) > -1;

  let fingerprintOptions = {
    enabled: isProductionLikeBuild,
    prepend: (env === 'production') ? 'https://s3.eu-west-3.amazonaws.com/hobby-time-namager/' : 'stage',
    extensions: ['js', 'css', 'png', 'jpg', 'gif', 'map', 'svg', 'pdf', 'ico']
  }

  let app = new EmberApp(defaults, {
    'ember-bootstrap': {
      'bootstrapVersion': 3,
      'importBootstrapFont': true,
      'importBootstrapCSS': false
    },

    fingerprint: fingerprintOptions
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
