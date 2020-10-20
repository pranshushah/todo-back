import request from 'supertest';
import { app } from '../../../app';
import { createTodo } from '../../../test/createTodo';

it('should create step able to edit done', async () => {
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
    .patch('/api/edit/step/title')
    .send({
      todoId: todoBody.id,
      newStepTitle: 'newStepTitle',
      stepId: res.body.steps[0].id,
    })
    .set('Cookie', cookie);
  expect(re.body.steps[0].taskTitle).toEqual('newStepTitle');
});

it('should throw error because not autherized', async () => {
  const { todoBody } = await createTodo();
  const res = await request(app)
    .patch('/api/edit/step/title')
    .send({ todoId: todoBody.id, newStepTitle: 'newStepTitle' });
  expect(res.body.errors[0].message).toEqual('you are not authorized');
});

it('should throw error because of empty title', async () => {
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
    .patch('/api/edit/step/title')
    .send({
      todoId: todoBody.id,
      stepId: res.body.steps[0].id,
      newStepTitle: '  ',
    })
    .set('Cookie', cookie);
  expect(re.body.errors[0].message).toEqual('newStepTitle can not be empty');
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
    .patch('/api/edit/step/title')
    .send({
      todoId: '5f8e72f9486e4c645e323b58',
      stepId: res.body.steps[0].id,
      newStepTitle: 'eignrjgnjfn',
    })
    .set('Cookie', cookie);
  expect(re.body.errors[0].message).toEqual('todo does not exist');
});
