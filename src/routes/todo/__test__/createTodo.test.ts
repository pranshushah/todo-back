import request from 'supertest';
import { app } from '../../../app';
import { googleAuthentication } from '../../../test/googleAuth';

it('should create todo', async () => {
  const cookie = await googleAuthentication();
  const res = await request(app)
    .post('/api/todo/new')
    .send({ todoTitle: 'my todo title' })
    .set('Cookie', cookie)
    .expect(200);
  expect(res.body.id).toBeDefined();
});

it('should create todo in project', async () => {
  const cookie = await googleAuthentication();
  const res1 = await request(app)
    .post('/api/project/new')
    .send({ projectName: 'new project' })
    .set('Cookie', cookie)
    .expect(200);
  const res = await request(app)
    .post('/api/todo/new')
    .send({ todoTitle: 'my todo title', projectId: res1.body.id })
    .set('Cookie', cookie)
    .expect(200);
  expect(res.body.id).toBeDefined();
  expect(res.body.projectId).toEqual(res1.body.id);
});

it('should throw error beacause not authenticated', async () => {
  const res = await request(app)
    .post('/api/todo/new')
    .send({ todoTitle: 'my todo title' });
  expect(res.body.errors[0].message).toEqual('you are not authorized');
});

it('should throw error beacause empty todo title', async () => {
  const cookie = await googleAuthentication();
  const res = await request(app)
    .post('/api/todo/new')
    .send({ todoTitle: ' ' })
    .set('Cookie', cookie);
  expect(res.body.errors[0].message).toEqual('todoTitle can not be empty');
});

it('should throw error if adding todo to the project that does not exist', async () => {
  const cookie = await googleAuthentication();
  const res = await request(app)
    .post('/api/todo/new')
    .send({ todoTitle: 'my todo title', projectId: '5f85b6d0bd852754500bb5ca' })
    .set('Cookie', cookie);
  expect(res.body.errors[0].message).toEqual('project does not exist');
});
