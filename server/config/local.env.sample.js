'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  AWS_S3_KEY: 'your-aws-key',
  AWS_S3_SECRET: 'your-aws-secret',
  AWS_S3_BUCKET: 'school-portfolio',
  reCaptchaSecret:'googles-reCaptcha-secret',
  DOMAIN: 'app-domain-name',
  SESSION_SECRET: "your-app-session-secret",
  MYVAR:"MyAppName",

  FACEBOOK_ID: 'app-id',
  FACEBOOK_SECRET: 'secret',

  TWITTER_ID: 'app-id',
  TWITTER_SECRET: 'secret',

  GOOGLE_ID: 'app-id',
  GOOGLE_SECRET: 'secret',

  // Control debug level for modules using visionmedia/debug
  DEBUG: '',
};
