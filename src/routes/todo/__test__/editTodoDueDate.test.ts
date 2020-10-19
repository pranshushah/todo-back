import request from 'supertest';
import { app } from '../../../app';
import { createTodo, createTodoInProject } from '../../../test/createTodo';
it('should be able to edit duedate', async () => {
  const { cookie, todoBody } = await createTodo();
  const res = await request(app)
    .patch('/api/todo/edit/duedate')
    .send({ todoId: todoBody.id, dueDate: new Date() })
    .set('Cookie', cookie);

  expect(res.body.dueDate).toBeDefined();
  expect(res.body.id).toEqual(todoBody.id);
});

it('should be able to edit duedate of todo in project', async () => {
  const { cookie, todoBody } = await createTodoInProject();
  const res = await request(app)
    .patch('/api/todo/edit/duedate')
    .send({ todoId: todoBody.id, dueDate: new Date() })
    .set('Cookie', cookie);
  expect(res.body.dueDate).toBeDefined();
  expect(res.body.projectId).toEqual(todoBody.projectId);
});

it('should throw error beacause not authenticated', async () => {
  const { todoBody } = await createTodo();
  const res = await request(app)
    .patch('/api/todo/edit/duedate')
    .send({ todoId: todoBody.id, dueDate: new Date() });
  expect(res.body.errors[0].message).toEqual('you are not authorized');
});

it('should throw error beacause duedate not passed', async () => {
  const { cookie, todoBody } = await createTodo();
  const res = await request(app)
    .patch('/api/todo/edit/duedate')
    .send({ todoId: todoBody.id })
    .set('Cookie', cookie);
  expect(res.body.errors[0].message).toEqual('you should proivide date');
});
