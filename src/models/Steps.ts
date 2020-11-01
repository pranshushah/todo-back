import { Schema, model, Document, Model, Types } from 'mongoose';
interface stepsAttr {
  taskTitle: string;
  done: boolean;
}
// this will be type of document when create with new Step();
export interface stepsDocInterface extends Document, stepsAttr {}

// we extending Model because it will we need to add static types.
interface stepsModel extends Model<stepsDocInterface> {
  build(user: stepsAttr): stepsDocInterface;
}

const stepsSchema = new Schema(
  {
    taskTitle: {
      type: String,
      required: [true, 'taskTitle is required'],
      validate: {
        validator(taskTitle: string) {
          return taskTitle.trim().length > 0;
        },
        message(message) {
          return `${message.value} is not valid task title`;
        },
      },
    },
    done: {
      type: Boolean,
      required: [true, 'done is required'],
    },
  },
  {
    // to convert returning object as we want
    toJSON: {
      versionKey: false,
      transform(doc: stepsDocInterface, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  },
);

const Step = model<stepsDocInterface, stepsModel>('Steps', stepsSchema);

// this created because we can type check with new Step({});
stepsSchema.statics.build = function (step: stepsAttr) {
  return new Step(step);
};

export { Step, stepsAttr, stepsSchema };
