import { Schema, model, Document, Model, Types } from 'mongoose';
import { stepsDocInterface, stepsSchema } from './Steps';
interface todoAttr {
  userId: Types.ObjectId;
  todoTitle: string;
  done: boolean;
  normalTask: boolean;
  projectId?: Types.ObjectId | string;
  dueDate?: Date | string;
  important?: boolean;
  myDay?: boolean;
  createdAt?: Date;
  steps?: stepsDocInterface[];
}
// this will be type of document when create with new Todo();
export interface todoDocInterface extends Document, todoAttr {}

// we extending Model because it will we need to add static types.
interface todoModel extends Model<todoDocInterface> {
  build(user: todoAttr): todoDocInterface;
}

const todoSchema = new Schema(
  {
    todoTitle: {
      type: String,
      required: [true, 'todoTitle is required'],
      validate: {
        validator(todoTitle: string) {
          return todoTitle.trim().length > 0;
        },
        message(message) {
          return `${message.value} is not valid todo title`;
        },
      },
    },
    userId: {
      type: Types.ObjectId,
      required: [true, 'userId is required '],
    },
    projectId: {
      type: Types.ObjectId,
    },
    done: {
      type: Boolean,
      required: [true, 'done is required'],
    },
    important: {
      type: Boolean,
    },
    myDay: {
      type: Boolean,
    },
    dueDate: {
      type: Date,
    },
    normalTask: {
      type: Boolean,
    },
    steps: [stepsSchema],
  },
  {
    // to convert returning object as we want
    toJSON: {
      versionKey: false,
      transform(doc: todoDocInterface, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
    //add created at
    timestamps: {
      createdAt: 'createdAt',
    },
  },
);

todoSchema.pre('validate', function (next) {
  if (this.get('projectId') || this.get('normalTask')) {
    next();
  } else {
    next(
      new Error(
        'you should provide either projectId or normalTaskShould be true',
      ),
    );
  }
});

const Todo = model<todoDocInterface, todoModel>('Todo', todoSchema);

// this created because we can type check with new Todo({});
todoSchema.statics.build = function (todo: todoAttr) {
  return new Todo(todo);
};

export { Todo };
