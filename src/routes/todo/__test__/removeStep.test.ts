import request from 'supertest';
import { app } from '../../../app';
import { createTodo } from '../../../test/createTodo';

it('should delete step', async () => {
  const { cookie, todoBody } = await createTodo();
  await request(app)
    .post('/api/step/new')
    .send({ todoId: todoBody.id, stepTitle: 'my step' })
    .set('Cookie', cookie);
  const res = await request(app)
    .post('/api/step/new')
    .send({ todoId: todoBody.id, stepTitle: 'my step1' })
    .set('Cookie', cookie);
  const re = await request(app)
    .patch('/api/edit/step/delete')
    .send({
      todoId: todoBody.id,
      stepId: res.body.steps[0].id,
    })
    .set('Cookie', cookie);
  expect(re.body.steps.length).toEqual(1);
});

it('should throw error because not autherized', async () => {
  const { todoBody } = await createTodo();
  const res = await request(app)
    .patch('/api/edit/step/delete')
    .send({ todoId: todoBody.id });
  expect(res.body.errors[0].message).toEqual('you are not authorized');
});

it('should throw error because it does not have todo', async () => {
  const { cookie, todoBody } = await createTodo();
  await request(app)
    .post('/api/step/new')
    .send({ todoId: todoBody.id, stepTitle: 'my step' })
    .set('Cookie', cookie);
  const res = await request(app)
    .post('/api/step/new')
    .send({ todoId: todoBody.id, stepTitle: 'my step1' })
    .set('Cookie', cookie);
  const re = await request(app)
    .patch('/api/edit/step/delete')
    .send({
      todoId: '5f8e72f9486e4c645e323b58',
      stepId: res.body.steps[0].id,
    })
    .set('Cookie', cookie);
  expect(re.body.errors[0].message).toEqual('todo does not exist');
});
