import { facebookAppId, facbookSecret } from '../config/keys';
import { User } from '../models/User';
import FacebookPassport from 'passport-facebook';
import passport from 'passport';

const FacebookStrategy = FacebookPassport.Strategy;

//callbackfunction for FacebookStrategy
async function googleDetailsCallback(
  accessToken: string,
  refreshToken: string,
  profile: FacebookPassport.Profile,
  done: Function,
) {
  console.log(profile);
}

// creating google-passport strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: facebookAppId,
      clientSecret: facbookSecret,
      callbackURL: '/api/auth/facebook/callback',
    },
    googleDetailsCallback,
  ),
);
