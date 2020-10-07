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
