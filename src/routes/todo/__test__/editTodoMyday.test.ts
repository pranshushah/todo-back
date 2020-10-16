import request from 'supertest';
import { app } from '../../../app';
import { createTodo, createTodoInProject } from '../../../test/createTodo';
it('should be able to edit myday status', async () => {
  const { cookie, todoBody } = await createTodo();
  const res = await request(app)
    .patch('/api/todo/edit/myday')
    .send({ todoId: todoBody.id, myDay: true })
    .set('Cookie', cookie);
  expect(res.body.myDay).toBeTruthy();
  expect(res.body.id).toEqual(todoBody.id);
});

it('should be able to edit myDay status of todo in project', async () => {
  const { cookie, todoBody } = await createTodoInProject();
  const res = await request(app)
    .patch('/api/todo/edit/myday')
    .send({ todoId: todoBody.id, myDay: true })
    .set('Cookie', cookie);
  expect(res.body.myDay).toBeTruthy();
  expect(res.body.id).toEqual(todoBody.id);
  expect(res.body.projectId).toEqual(todoBody.projectId);
});

it('should throw error beacause not authenticated', async () => {
  const { todoBody } = await createTodo();
  const res = await request(app)
    .patch('/api/todo/edit/myday')
    .send({ todoId: todoBody.id, myDay: true });
  expect(res.body.errors[0].message).toEqual('you are not authorized');
});

it('should throw error beacause myDay is not passed', async () => {
  const { cookie, todoBody } = await createTodo();
  const res = await request(app)
    .patch('/api/todo/edit/myday')
    .send({ todoId: todoBody.id })
    .set('Cookie', cookie);
  expect(res.body.errors[0].message).toEqual('myDay should be boolean');
});
