import Base from 'ember-simple-auth/authorizers/base';

export default Base.extend({
  authorize(sessionData, block) {
    block("X-USER-EMAIL", sessionData.email);
    block("X-USER-TOKEN", sessionData.token);
  }
});
