import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { authChecking } from '../../middleware/requireAuth';
import { Project } from '../../models/Project';
import { validateRequest } from '../../middleware/requestValidation';
import { BadRequestError } from '../../errors/bad_request';
import { Types } from 'mongoose';

interface patchProjectReqBody {
  updatedProjectName: string;
  projectId: string;
}

interface projectResBody {
  projectName: string;
  id: string;
  userId: string;
}

const router = express.Router();

router.patch(
  '/api/project',
  authChecking,
  [
    body('updatedProjectName')
      .trim()
      .notEmpty()
      .withMessage('project name can not be empty'),
  ],
  validateRequest,
  async (
    req: Request<any, projectResBody, patchProjectReqBody>,
    res: Response<projectResBody>,
  ) => {
    const project = await Project.findOneAndUpdate(
      { _id: req.body.projectId, userId: Types.ObjectId(req.user?.id) },
      {
        projectName: req.body.updatedProjectName.trim(),
      },
      { new: true },
    );
    if (!project) {
      console.log(project);
      throw new BadRequestError(
        'can not update the project that does not exist',
        400,
      );
    }
    res.status(200).send(project.toJSON());
  },
);

export { router as editProjectRoute };
