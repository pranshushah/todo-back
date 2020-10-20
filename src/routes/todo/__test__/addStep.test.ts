import request from 'supertest';
import { app } from '../../../app';
import { createTodo } from '../../../test/createTodo';

it('should create step', async () => {
  const { cookie, todoBody } = await createTodo();
  await request(app)
    .post('/api/step/new')
    .send({ todoId: todoBody.id, stepTitle: 'my step' })
    .set('Cookie', cookie);
  const re = await request(app)
    .post('/api/step/new')
    .send({ todoId: todoBody.id, stepTitle: 'my step2' })
    .set('Cookie', cookie);
  expect(re.body.steps.length).toEqual(2);
});

it('should throw error because not autherized', async () => {
  const { todoBody } = await createTodo();
  const res = await request(app)
    .post('/api/step/new')
    .send({ todoId: todoBody.id, stepTitle: 'my step' });
  expect(res.body.errors[0].message).toEqual('you are not authorized');
});

it('should throw error because of empty step title', async () => {
  const { cookie, todoBody } = await createTodo();
  const res = await request(app)
    .post('/api/step/new')
    .send({ todoId: todoBody.id, stepTitle: ' ' })
    .set('Cookie', cookie);
  expect(res.body.errors[0].message).toEqual('stepTitle can not be empty');
});
it('should throw error because it does not have todo', async () => {
  const { cookie } = await createTodo();
  const res = await request(app)
    .post('/api/step/new')
    .send({ todoId: '5f8e72f9486e4c645e323b58', stepTitle: 'my step' })
    .set('Cookie', cookie);
  expect(res.body.errors[0].message).toEqual('todo does not exist');
});
