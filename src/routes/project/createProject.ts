import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { authChecking } from '../../middleware/requireAuth';
import { Project } from '../../models/Project';
import { validateRequest } from '../../middleware/requestValidation';
import { BadRequestError } from '../../errors/bad_request';
import { Types } from 'mongoose';
interface newProjectReqBody {
  projectName: string;
}
interface projectResBody {
  projectName: string;
  id: string;
  userId: string;
}

const router = express.Router();

router.post(
  '/api/project/new',
  authChecking,
  [
    body('projectName')
      .trim()
      .notEmpty()
      .withMessage('project name can not be empty'),
  ],
  validateRequest,
  async (
    req: Request<any, projectResBody, newProjectReqBody>,
    res: Response<projectResBody>,
  ) => {
    const givenProjectName = req.body.projectName.trim();
    const givenUserObjectId = Types.ObjectId(req.user?.id)!;
    // check if projectname already exist.
    const project = await Project.findOne({
      userId: givenUserObjectId,
      projectName: givenProjectName,
    });
    if (project) {
      console.log(project);
      throw new BadRequestError('project name already exist', 400);
    } else {
      // create new project
      const newProject = Project.build({
        userId: givenUserObjectId, // checked req.user in authChecking middleware
        projectName: givenProjectName,
      });
      await newProject.save();
      res.status(200).send(newProject.toJSON());
    }
  },
);

export { router as createProjectRoute };
