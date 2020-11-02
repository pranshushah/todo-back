import { Schema, model, Document, Model } from 'mongoose';
interface userAttr {
  googleId?: string;
  email: string;
  name: string;
  imageURL: string;
  twitterId?: string;
}
// this will be type of document when create with new User();
export interface userDocInterface extends Document, userAttr {}

// we extending Model because it will we need to add static types.
interface userModal extends Model<userDocInterface> {
  build(user: userAttr): userDocInterface;
}

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'email is required'],
      validate: {
        validator(email: string) {
          return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            email,
          );
        },
        message(message) {
          return `${message.value} is not valid email`;
        },
      },
    },
    name: {
      type: String,
      required: [true, 'name is required '],
    },
    imageURL: {
      type: String,
      required: [true, 'imageurl  is required '],
    },
    googleId: {
      type: String,
    },
    twitterId: {
      type: String,
    },
  },
  {
    // to convert returning object as we want
    toJSON: {
      versionKey: false,
      transform(doc: userDocInterface, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  },
);

// googleId XOR twitterId should be 1;
userSchema.pre('validate', function (next) {
  if (this.get('googleId') || this.get('twitterId')) {
    next();
  } else {
    next(new Error('you should provide either googleid or twitterid'));
  }
});

// this created because we can type check with new User({});
userSchema.statics.build = function (user: userAttr) {
  return new User(user);
};

const User = model<userDocInterface, userModal>('User', userSchema);

export { User };
