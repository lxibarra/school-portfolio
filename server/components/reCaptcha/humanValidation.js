var request = require('request');

exports.go = function(key, callback) {
  request.post({url:'https://www.google.com/recaptcha/api/siteverify',
    form: {secret:process.env.reCaptchaSecret, response:key}}, function(err, httpResponse, body) {
    callback(err, httpResponse, body);
  });
};

