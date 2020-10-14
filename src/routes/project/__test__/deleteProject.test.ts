import request from 'supertest';
import { app } from '../../../app';
import { googleAuthentication } from '../../../test/googleAuth';

it('should be able to delete project', async () => {
  const cookie = await googleAuthentication();
  const res = await request(app)
    .post('/api/project/new')
    .send({ projectName: 'new project' })
    .set('Cookie', cookie)
    .expect(200);
  await request(app)
    .delete('/api/project')
    .send({ projectId: res.body.id })
    .set('Cookie', cookie)
    .expect(200);
});

it('should be able to delete project', async () => {
  const res = await request(app)
    .delete('/api/project')
    .send({ projectId: 'id' });
  expect(res.body.errors[0].message).toEqual('you are not authorized');
});

it('should throw error if project you are trying to update does not exist', async () => {
  const cookie = await googleAuthentication();
  await request(app)
    .post('/api/project/new')
    .send({ projectName: 'new project' })
    .set('Cookie', cookie);
  const res = await request(app)
    .delete('/api/project')
    .send({
      projectId: '5f85b6d0bd852754500bb5ca',
    })
    .set('Cookie', cookie);
  expect(res.body.errors[0].message).toEqual(
    'cannot delete project that does not exist',
  );
});
