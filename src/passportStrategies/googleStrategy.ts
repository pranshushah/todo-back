import { googleClientId, googleClientSecret } from '../config/keys';
import { User, userDocInterface } from '../models/User';
import GooglePassport from 'passport-google-oauth20';
import passport from 'passport';
import MockStrategy from '../config/mocks/mockStrategy';
import { googleMockProfile } from '../config/mocks/googleMockProfile';
const GoogleStrategy = GooglePassport.Strategy;

//callbackfunction for GoogleStrategy
async function googleDetailsCallback(
  accessToken: string,
  refreshToken: string,
  profile: GooglePassport.Profile,
  done: GooglePassport.VerifyCallback,
) {
  const existingUser = await User.findOne({ email: profile._json.email });
  if (existingUser) {
    // if given email is used when signing with facebook we will just add googleId into the document
    if (!existingUser.googleId) {
      const updatedExistingUser = await User.findOneAndUpdate(
        { email: existingUser.email },
        { googleId: profile.id },
        { new: true },
      );
      done(undefined, updatedExistingUser);
      return;
    }
    //user has already signup so we will continue
    done(undefined, existingUser);
    return;
  } else {
    // user doesnot exist we will signup
    const user = User.build({
      googleId: profile.id,
      name: profile.displayName,
      email: profile._json.email as string,
      imageURL: profile._json.picture as string,
    });
    const newUser = await user.save();
    done(undefined, newUser);
    return;
  }
}

function envStrategy() {
  let strategy;
  if (process.env.NODE_ENV === 'test') {
    strategy = new MockStrategy(
      { name: 'google', user: googleMockProfile },
      // @ts-ignore  (doing this because of profile arg)
      googleDetailsCallback,
    );
  } else {
    strategy = new GoogleStrategy(
      {
        clientID: googleClientId,
        clientSecret: googleClientSecret,
        callbackURL: '/api/auth/google/callback',
      },
      googleDetailsCallback,
    );
  }
  return strategy;
}

passport.use(envStrategy());

//this function will run after googleDetailsCallback
passport.serializeUser((user: userDocInterface, done) => {
  done(undefined, user.id);
});

// getting user from cookie
passport.deserializeUser(async (id: string, done) => {
  const user = await User.findById(id);
  done(undefined, user?.toJSON());
});
