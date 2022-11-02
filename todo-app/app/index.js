const express = require('express');
const config = require("./configuration/index.js");
const { auth, requiresAuth } = require('express-openid-connect');
// const indexRouter = require('./routes/index');
// const authRouter = require('./routes/auth');
// const session = require('express-session');
// const passport = require('passport');
// const SQLiteStore = require('connect-sqlite3')(session);
const cors = require("cors");

const app = express()
app.use(cors());
app.set('port', config.PORT); 

app.use(
  auth({
    issuerBaseURL: `${config.AUTH_DISCOVERY_URL}/realms/${config.AUTH_REALM}/`,
    baseURL: config.APP_URL,
    clientID: config.AUTH_CLIENT_ID,
    clientSecret: config.AUTH_CLIENT_SECRET, 
    secret: 'guazzaBuglioPiripicchio',
    idpLogout: true,
    authRequired: false,
    authorizationParams: {
      response_type: 'code', // This requires you to provide a client secret
      scope: 'openid profile email',
    },
  })
);

app.get('/profile', requiresAuth(), async (req, res) => {
  let { token_type, access_token } = req.oidc.accessToken;
  
  res.send(`Token type: ${token_type}`);
});

app.get('/', async (req, res) => {
  res.send('Express + TypeScript Server');
});
// app.use('/', authRouter);

app.listen(config.PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${config.PORT}`);
});


