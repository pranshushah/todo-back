import { connect } from 'mongoose';
import './passportStrategies/googleStrategy'; // importing google strategy
import './passportStrategies/twitterStrategy';
import { app } from './app';

async function startDbAndServer() {
  try {
    await connect(process.env.mongoURI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    if (process.env.NODE_ENV === 'development') {
      console.log('connected to auth database');
    }
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.error(err);
    }
  }
  app.listen(process.env.PORT || 4000, () => {
    if (process.env.NODE_ENV === 'development') {
      console.log('backend server started on port 4000');
    }
  });
}
startDbAndServer();
