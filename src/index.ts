import express from 'express';
import passport from 'passport';
import cookieSession from 'cookie-session';
import { googleLogin } from './routes/auth/google';
import { twitterLogin } from './routes/auth/twitter';
import { connect } from 'mongoose';
import { mongoURI, cookieKey } from './config/keys';
import './passportStrategies/googleStrategy'; // importing google strategy
import './passportStrategies/twitterStrategy';
const app = express();
app.use(express.json());
app.use(
  cookieSession({
    maxAge: 300 * 24 * 60 * 60 * 1000,
    keys: [cookieKey],
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(googleLogin);
app.use(twitterLogin);
app.get('/fail', (req, res) => {
  res.send('sorry');
});

app.get('/done', (req, res) => {
  res.send('done');
});

(async function startDbAndServer() {
  try {
    await connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('connected to auth database');
  } catch (err) {
    console.error(err);
  }
  app.listen(4000, () => {
    console.log('backend server started on port 4000');
  });
})();
