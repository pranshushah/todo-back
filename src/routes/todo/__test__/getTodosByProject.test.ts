import request from 'supertest';
import { app } from '../../../app';
import { googleAuthentication } from '../../../test/googleAuth';

it('should get all tasks by project', async () => {
  const cookie = await googleAuthentication();
  const re = await request(app)
    .post('/api/project/new')
    .send({ projectName: 'new project' })
    .set('Cookie', cookie);
  await request(app)
    .post('/api/todo/new')
    .send({ todoTitle: 'my todo title', projectId: re.body.id })
    .set('Cookie', cookie);
  await request(app)
    .post('/api/todo/new')
    .send({ todoTitle: 'my todo title1', projectId: re.body.id })
    .set('Cookie', cookie);
  await request(app)
    .post('/api/todo/new')
    .send({ todoTitle: 'my todo title2', projectId: re.body.id })
    .set('Cookie', cookie);
  const res = await request(app)
    .get('/api/todo/gettodosbyproject')
    .send({ projectId: re.body.id })
    .set('Cookie', cookie);
  expect(res.body.length).toEqual(3);
});

it('should get 0 tasks', async () => {
  const cookie = await googleAuthentication();
  const re = await request(app)
    .post('/api/project/new')
    .send({ projectName: 'new project' })
    .set('Cookie', cookie);
  const res = await request(app)
    .get('/api/todo/gettodosbyproject')
    .send({ projectId: re.body.id })
    .set('Cookie', cookie);
  expect(res.body.length).toEqual(0);
});

it('should throw error because you are not logged in', async () => {
  const res = await request(app).get('/api/todo/getalltask');
  expect(res.body.errors[0].message).toEqual('you are not authorized');
});
