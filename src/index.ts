import { connect } from 'mongoose';
import { mongoURI } from './config/keys';
import './passportStrategies/googleStrategy'; // importing google strategy
import './passportStrategies/twitterStrategy';
import { app } from './app';
(async function startDbAndServer() {
  try {
    await connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    if (process.env.dev) {
      process.stdout.write('connected to auth database');
    }
  } catch (err) {
    if (process.env.dev) {
      process.stdout.write(err);
    }
  }
  app.listen(4000, () => {
    if (process.env.dev) {
      process.stdout.write('backend server started on port 4000');
    }
  });
})();
