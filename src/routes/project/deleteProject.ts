import express, { Request, Response } from 'express';
import { authChecking } from '../../middleware/requireAuth';
import { Project } from '../../models/Project';
import { BadRequestError } from '../../errors/bad_request';
import { Types } from 'mongoose';
interface deleteProjectReqBody {
  projectId: string;
}
interface projectResBody {
  projectName: string;
  id: string;
  userId: string;
}

const router = express.Router();

router.delete(
  '/api/project',
  authChecking,
  async (
    req: Request<any, projectResBody, deleteProjectReqBody>,
    res: Response<projectResBody>,
  ) => {
    const givenUserObjectId = Types.ObjectId(req.user?.id)!;
    // check if  given project exist.
    const deletedProject = await Project.findOneAndDelete({
      _id: req.body.projectId,
      userId: givenUserObjectId,
    });
    if (!deletedProject) {
      throw new BadRequestError(
        'can not update the project that does not exist',
        400,
      );
    }
    res.status(200).send(deletedProject?.toJSON());
  },
);

export { router as deleteProjectRoute };
