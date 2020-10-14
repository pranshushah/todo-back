import request from 'supertest';
import { app } from '../../../app';
import { googleAuthentication } from '../../../test/googleAuth';

it('should be able to edit project', async () => {
  const cookie = await googleAuthentication();
  const res = await request(app)
    .post('/api/project/new')
    .send({ projectName: 'new project' })
    .set('Cookie', cookie)
    .expect(200);
  await request(app)
    .patch('/api/project')
    .send({ updatedProjectName: 'updatedProject', projectId: res.body.id })
    .set('Cookie', cookie)
    .expect(200);
});

it('should throw error if not logged in', async () => {
  const res = await request(app)
    .patch('/api/project/')
    .send({ projectName: 'new project' });
  expect(res.body.errors[0].message).toEqual('you are not authorized');
});

it('should throw error if project name is empty string', async () => {
  const cookie = await googleAuthentication();
  const res = await request(app)
    .post('/api/project/new')
    .send({ projectName: 'new project' })
    .set('Cookie', cookie);
  const res1 = await request(app)
    .patch('/api/project')
    .send({ updatedProjectName: ' ', projectId: res.body.id })
    .set('Cookie', cookie);
  expect(res1.body.errors[0].message).toEqual('project name can not be empty');
});

it('should throw error if project you are trying to update does not exist', async () => {
  const cookie = await googleAuthentication();
  await request(app)
    .post('/api/project/new')
    .send({ projectName: 'new project' })
    .set('Cookie', cookie);
  const res = await request(app)
    .patch('/api/project')
    .send({
      updatedProjectName: 'newproject name',
      projectId: '5f85b6d0bd852754500bb5ca',
    })
    .set('Cookie', cookie);
  expect(res.body.errors[0].message).toEqual(
    'cannot update project that does not exist',
  );
});
