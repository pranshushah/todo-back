import { twitterSecret, twitterAppId } from '../config/keys';
import { User } from '../models/User';
import TwitterPassport from 'passport-twitter';
import passport from 'passport';
import MockStrategy from '../config/mocks/mockStrategy';
import { twitterMockProfile } from '../config/mocks/twitterMockProfile';

const TwitterStrategy = TwitterPassport.Strategy;

//callbackfunction for TwitterStrategy
async function twitterDetailsCallback(
  accessToken: string,
  refreshToken: string,
  profile: TwitterPassport.Profile,
  done: Function,
) {
  const existingUser = await User.findOne({ email: profile._json.email });
  if (existingUser) {
    // if given email is used when signing with google we will just add twitterid into the document
    if (!existingUser.twitterId) {
      const updatedExistingUser = await User.findOneAndUpdate(
        { email: existingUser.email },
        { twitterId: profile._json.id_str },
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
      twitterId: profile._json.id_str,
      name: profile._json.screen_name,
      email: profile._json.email as string,
      imageURL: profile._json.profile_image_url_https as string,
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
      { name: 'twitter', user: twitterMockProfile },
      // @ts-ignore  (doing this because of user)
      twitterDetailsCallback,
    );
  } else {
    strategy = new TwitterStrategy(
      {
        consumerKey: twitterAppId,
        consumerSecret: twitterSecret,
        includeEmail: true,
        callbackURL: '/api/auth/twitter/callback',
      },
      twitterDetailsCallback,
    );
  }
  return strategy;
}

// creating google-passport strategy
passport.use(envStrategy());
