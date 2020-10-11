import express from 'express';
import passport from 'passport';
import cookieSession from 'cookie-session';
import { googleLogin } from './routes/auth/google';
import { twitterLogin } from './routes/auth/twitter';
import { cookieKey } from './config/keys';
import { NoRouteError } from './errors/no_routes_error';
import { errorHandler } from './middleware/errorHandler';
import { currentUser_logout } from './routes/auth/currentUser_logout';
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
app.use(currentUser_logout);

app.all('*', () => {
  throw new NoRouteError();
});

app.use(errorHandler);

export { app };
