import express from 'express';
import passport from 'passport';
import cookieSession from 'cookie-session';
import { googleLogin } from './routes/auth/google';
import { twitterLogin } from './routes/auth/twitter';
import { cookieKey } from './config/keys';
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

export { app };
