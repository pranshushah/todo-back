import request from 'supertest';
import { app } from '../../../app';
import { googleAuthentication } from '../../../test/googleAuth';

it('should return all project created by user', async () => {
  const cookie = await googleAuthentication();
  await request(app)
    .post('/api/project/new')
    .send({ projectName: 'new project' })
    .set('Cookie', cookie);
  await request(app)
    .post('/api/project/new')
    .send({ projectName: 'new project1' })
    .set('Cookie', cookie);
  await request(app)
    .post('/api/project/new')
    .send({ projectName: 'new project2' })
    .set('Cookie', cookie);
  const res = await request(app)
    .get('/api/project/getall')
    .set('Cookie', cookie);

  expect(res.body.length).toEqual(3);
});

it('should return empty array', async () => {
  const cookie = await googleAuthentication();
  const res = await request(app)
    .get('/api/project/getall')
    .set('Cookie', cookie);
  expect(res.body.length).toEqual(0);
});

it('should throw error because you are not logged in', async () => {
  const res = await request(app).get('/api/project/getall');
  expect(res.body.errors[0].message).toEqual('you are not authorized');
});
