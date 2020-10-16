import request from 'supertest';
import { app } from '../../../app';
import { createTodo, createTodoInProject } from '../../../test/createTodo';
it('should be able to edit important status', async () => {
  const { cookie, todoBody } = await createTodo();
  const res = await request(app)
    .patch('/api/todo/edit/important')
    .send({ todoId: todoBody.id, important: true })
    .set('Cookie', cookie);
  expect(res.body.important).toBeTruthy();
  expect(res.body.id).toEqual(todoBody.id);
});

it('should be able to edit important status of todo in project', async () => {
  const { cookie, todoBody } = await createTodoInProject();
  const res = await request(app)
    .patch('/api/todo/edit/important')
    .send({ todoId: todoBody.id, important: true })
    .set('Cookie', cookie);
  expect(res.body.important).toBeTruthy();
  expect(res.body.id).toEqual(todoBody.id);
  expect(res.body.projectId).toEqual(todoBody.projectId);
});

it('should throw error beacause not authenticated', async () => {
  const { todoBody } = await createTodo();
  const res = await request(app)
    .patch('/api/todo/edit/important')
    .send({ todoId: todoBody.id, important: true });
  expect(res.body.errors[0].message).toEqual('you are not authorized');
});

it('should throw error beacause important is not passed', async () => {
  const { cookie, todoBody } = await createTodo();
  const res = await request(app)
    .patch('/api/todo/edit/important')
    .send({ todoId: todoBody.id })
    .set('Cookie', cookie);
  expect(res.body.errors[0].message).toEqual('important should be boolean');
});

it('should throw error if adding todo to the project that does not exist', async () => {
  const { cookie, todoBody } = await createTodoInProject();
  const res = await request(app)
    .patch('/api/todo/edit/important')
    .send({
      todoId: todoBody.id,
      important: true,
      projectId: '5f85b6d0bd852754500bb5ca',
    })
    .set('Cookie', cookie);
  expect(res.body.errors[0].message).toEqual('project does not exist');
});

it('should throw error beacause trying to edit todo that does not exist', async () => {
  const { cookie } = await createTodo();
  const res = await request(app)
    .patch('/api/todo/edit/important')
    .send({ todoId: '5f85b6d0bd852754500bb5ca', important: false })
    .set('Cookie', cookie);
  expect(res.body.errors[0].message).toEqual('todo does not exist');
});
