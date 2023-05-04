"use strict";

/* Express */
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const HttpStatus = require('http-status-codes');
const axios = require("axios");
const keyCloakUrl = `${process.env.KEYCLOAK_URL}/auth/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/userinfo`

app.use(cors())
/* Body parser */
app.use(bodyParser.json({limit: "10mb"}));
app.use(bodyParser.urlencoded({limit: "10mb", parameterLimit: 1000, extended: true}));

/**
 * JWT vertification
 */
const jwtAuth = (req, res, next) => {
    // Note: req.path will not give you the full url; use req.originalUrl instead
    const bearerHeader = req.headers['authorization']; // Header names are not case-sensitive. i.e. all will be converted to lower case on receive.
    if (bearerHeader !== undefined) {
        const jwtToken = bearerHeader.split(' ')[1];
        let options = { headers: { 'Authorization': `Bearer ${jwtToken}` } };
        axios.get(keyCloakUrl, options).then((response) => {
                req.userId = response.data.email;
                req.clientRoles = response.data.client_roles ? response.data.client_roles: [];
                next();   
            // }   
        }).catch((error) => {
            res.status(HttpStatus.FORBIDDEN).json({
                code: 'AuthorizationError',
                msg: 'Invalid token'
            });
        });
    } else {
        res.status(HttpStatus.FORBIDDEN).json({
            code: 'AuthorizationError',
            msg: 'Missing authorization header'
        });
    }
}

/* Routes */
app.use("/", express.static(path.join(__dirname, "../build")));

/* VO-Authering Features */
app.get("/feature-flags", require("./routes/featureFlag.js"));
app.get("/client-features", require("./routes/clientFeatures.js"));
app.patch("/feature-flags", require("./routes/updateFeatureFlag.js"));


/* For Deploying */
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "../build", "index.html"), function (err) {
    if (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
  });
});

const http = require("http");
const server = http.createServer(app);

module.exports = server;
