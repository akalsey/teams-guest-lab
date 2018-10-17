var jwt = require('jsonwebtoken');
var request = require('request');
var express = require('express');

var app = express();


app.get('/', function(req, res) {
    var payload = {
        "sub": "0xDECAFBAD", // A unique ID for your user
        "name": "Michael Dolly", // Display name, pick anything you'd like.
        "iss": "YOUR-ISSUER-ID-HERE" // Use your Guest Issuer ID from your Guest app
      };

    jwt.sign(
    payload,
    Buffer.from('YOUR-SHARED-SECRET', 'base64'), // The shared secret from your Guest app
    { expiresIn: '1h' },
    function(err, token) {
        console.log('JWT', token);
        request.post({
            url : 'https://api.ciscospark.com/v1/jwt/login',
            auth: {
            'bearer': token
            }
        },
            function (error, response, body) {
                bearer = JSON.parse(body).token;
                console.log('OAuth token', bearer);
                res.send(`<link  rel="stylesheet" href="https://code.s4d.io/widget-space/production/main.css">
                <script src="https://code.s4d.io/widget-space/production/bundle.js"></script>
                <div data-toggle="ciscospark-space"
                        data-access-token="${bearer}"
                        data-to-person-email="you@example.com" />`);
        });
    }
    );
});

var server = app.listen(5533, function() {
    console.log('listening');
  });