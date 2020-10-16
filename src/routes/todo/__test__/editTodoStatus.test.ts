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
