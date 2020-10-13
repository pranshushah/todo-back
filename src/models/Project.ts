import { Schema, model, Document, Model, Types } from 'mongoose';
interface projectAttr {
  userId: Types.ObjectId;
  projectName: string;
}
// this will be type of document when create with new Project();
export interface projectDocInterface extends Document, projectAttr {}

// we extending Model because it will we need to add static types.
interface projectModal extends Model<projectDocInterface> {
  build(user: projectAttr): projectDocInterface;
}

const projectSchema = new Schema(
  {
    projectName: {
      type: String,
      required: [true, 'project name is required'],
      validate: {
        validator(projectName: string) {
          return projectName.trim().length > 0;
        },
        message(message) {
          return `${message.value} is not valid project name`;
        },
      },
    },
    userId: {
      type: Types.ObjectId,
      required: [true, 'userId is required '],
    },
  },
  {
    // to convert returning object as we want
    toJSON: {
      versionKey: false,
      transform(doc: projectDocInterface, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  },
);

// this created because we can type check with new Project({});
projectSchema.statics.build = function (project: projectAttr) {
  return new Project(project);
};

const Project = model<projectDocInterface, projectModal>(
  'Project',
  projectSchema,
);
export { Project };
