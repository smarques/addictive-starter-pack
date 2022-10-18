const express = require('express');
const config = require("./configuration/index.js");
// const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
var session = require('express-session');
var passport = require('passport');
var SQLiteStore = require('connect-sqlite3')(session);
var cors = require("cors");

const app = express()
app.use(cors());
app.set('port', config.PORT);
app.use(session({
  secret: 'keyboard cat',
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  store: new SQLiteStore({ db: 'sessions.db', dir: '/home/node/data' })
}));
app.use(passport.authenticate('session'));
app.get('/', async (req, res) => {
  await config.loadIssuer()
  res.send('Express + TypeScript Server');
});
app.use('/', authRouter);

app.listen(config.PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${config.PORT}`);
});


