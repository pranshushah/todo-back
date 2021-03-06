import request from 'supertest';
import { app } from '../../../app';
import { googleAuthentication } from '../../../test/googleAuth';

it('should get all tasks', async () => {
  const cookie = await googleAuthentication();
  await request(app)
    .post('/api/todo/new')
    .send({ todoTitle: 'my todo title' })
    .set('Cookie', cookie);
  await request(app)
    .post('/api/todo/new')
    .send({ todoTitle: 'my todo title1' })
    .set('Cookie', cookie);
  await request(app)
    .post('/api/todo/new')
    .send({ todoTitle: 'my todo title2' })
    .set('Cookie', cookie);
  const res = await request(app)
    .get('/api/todo/getalltask')
    .set('Cookie', cookie);
  expect(res.body.length).toEqual(3);
});

it('should get 0 tasks', async () => {
  const cookie = await googleAuthentication();
  const res = await request(app)
    .get('/api/todo/getalltask')
    .set('Cookie', cookie);
  expect(res.body.length).toEqual(0);
});

it('should throw error because you are not logged in', async () => {
  const res = await request(app).get('/api/todo/getalltask');
  expect(res.body.errors[0].message).toEqual('you are not authorized');
});
