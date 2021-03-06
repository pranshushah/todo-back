import request from 'supertest';
import { app } from '../../../app';
import { createTodo, createTodoInProject } from '../../../test/createTodo';
it('should be able to edit done status', async () => {
  const { cookie, todoBody } = await createTodo();
  const res = await request(app)
    .patch('/api/todo/edit/done')
    .send({ todoId: todoBody.id, done: true })
    .set('Cookie', cookie);
  expect(res.body.done).toBeTruthy();
  expect(res.body.id).toEqual(todoBody.id);
});

it('should be able to edit done status of todo in project', async () => {
  const { cookie, todoBody } = await createTodoInProject();
  const res = await request(app)
    .patch('/api/todo/edit/done')
    .send({ todoId: todoBody.id, done: true })
    .set('Cookie', cookie);
  expect(res.body.done).toBeTruthy();
  expect(res.body.id).toEqual(todoBody.id);
  expect(res.body.projectId).toEqual(todoBody.projectId);
});

it('should throw error beacause not authenticated', async () => {
  const { todoBody } = await createTodo();
  const res = await request(app)
    .patch('/api/todo/edit/done')
    .send({ todoId: todoBody.id, done: true });
  expect(res.body.errors[0].message).toEqual('you are not authorized');
});

it('should throw error beacause done is not passed', async () => {
  const { cookie, todoBody } = await createTodo();
  const res = await request(app)
    .patch('/api/todo/edit/done')
    .send({ todoId: todoBody.id })
    .set('Cookie', cookie);
  expect(res.body.errors[0].message).toEqual('done should be boolean');
});

it('should throw error if adding todo to the project that does not exist', async () => {
  const { cookie, todoBody } = await createTodoInProject();
  const res = await request(app)
    .patch('/api/todo/edit/done')
    .send({
      todoId: todoBody.id,
      done: true,
      projectId: '5f85b6d0bd852754500bb5ca',
    })
    .set('Cookie', cookie);
  expect(res.body.errors[0].message).toEqual('project does not exist');
});

it('should throw error beacause trying to edit todo that does not exist', async () => {
  const { cookie } = await createTodo();
  const res = await request(app)
    .patch('/api/todo/edit/done')
    .send({ todoId: '5f85b6d0bd852754500bb5ca', done: false })
    .set('Cookie', cookie);
  expect(res.body.errors[0].message).toEqual('todo does not exist');
});
