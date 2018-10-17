var jwt = require('jsonwebtoken');

var payload = {
  "sub": "0xDECAFBAD", // A unique ID for your user
  "name": "Michael Dolly", // Display name, pick anything you'd like.
  "iss": "YOUR-ISSUER-ID-HERE" // Use your Guest Issuer ID from your Guest app
};

var token = jwt.sign(
  payload,
  Buffer.from('YOUR-SHARED-SECRET', 'base64'), // The shared secret from your Guest app
  { expiresIn: '1h' },
  function(err, token) {
    console.log(token);
  }
);