import { app } from '../app';
import request from 'supertest';
import { googleAuthentication } from './googleAuth';

export async function createTodo() {
  const cookie = await googleAuthentication();
  const res = await request(app)
    .post('/api/todo/new')
    .send({ todoTitle: 'my todo title' })
    .set('Cookie', cookie);
  return { cookie, todoBody: res.body };
}

export async function createTodoInProject() {
  const cookie = await googleAuthentication();
  const res = await request(app)
    .post('/api/project/new')
    .send({ projectName: 'new project' })
    .set('Cookie', cookie);
  const res1 = await request(app)
    .post('/api/todo/new')
    .send({ todoTitle: 'my todo title', projectId: res.body.id })
    .set('Cookie', cookie);
  return { cookie, todoBody: res1.body };
}
