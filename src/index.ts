import express from 'express';
import passport from 'passport';
import cookieSession from 'cookie-session';
import { googleLogin } from './routes/auth/google';
import { facebookLogin } from './routes/auth/facebook';
import { connect } from 'mongoose';
import { mongoURI, cookieKey } from './config/keys';
import './passportStrategies/googleStrategy'; // importing google strategy
import './passportStrategies/facebookStrategy';
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
app.use(facebookLogin);

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
