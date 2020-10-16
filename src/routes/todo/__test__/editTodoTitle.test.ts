import request from 'supertest';
import { app } from '../../../app';
import { createTodo, createTodoInProject } from '../../../test/createTodo';
it('should be able to edit title', async () => {
  const { cookie, todoBody } = await createTodo();
  const res = await request(app)
    .patch('/api/todo/edit/title')
    .send({ todoId: todoBody.id, newTodoTitle: 'new Title' })
    .set('Cookie', cookie);
  expect(res.body.todoTitle).toEqual('new Title');
  expect(res.body.id).toEqual(todoBody.id);
});

it('should be able to edit title of todo in project', async () => {
  const { cookie, todoBody } = await createTodoInProject();
  const res = await request(app)
    .patch('/api/todo/edit/title')
    .send({ todoId: todoBody.id, newTodoTitle: 'new title' })
    .set('Cookie', cookie);
  expect(res.body.todoTitle).toEqual('new title');
  expect(res.body.projectId).toEqual(todoBody.projectId);
});

it('should throw error beacause not authenticated', async () => {
  const { todoBody } = await createTodo();
  const res = await request(app)
    .patch('/api/todo/edit/title')
    .send({ todoId: todoBody.id, newTodoTitle: 'new title' });
  expect(res.body.errors[0].message).toEqual('you are not authorized');
});

it('should throw error beacause title not passed', async () => {
  const { cookie, todoBody } = await createTodo();
  const res = await request(app)
    .patch('/api/todo/edit/title')
    .send({ todoId: todoBody.id })
    .set('Cookie', cookie);
  expect(res.body.errors[0].message).toEqual('newTodoTitle can not be empty');
});
