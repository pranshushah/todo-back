import request from 'supertest';
import { app } from '../../../app';
import { googleAuthentication } from '../../../test/googleAuth';
import { twitterAuthentication } from '../../../test/twitterAuth';

it('should create new project with google-auth', async () => {
  const cookie = await googleAuthentication();
  await request(app)
    .post('/api/project/new')
    .send({ projectName: 'new project' })
    .set('Cookie', cookie)
    .expect(200);
});

it('should create new project with twitter-auth', async () => {
  const cookie = await twitterAuthentication();
  await request(app)
    .post('/api/project/new')
    .send({ projectName: 'new project' })
    .set('Cookie', cookie)
    .expect(200);
});

// from now on we will only use google auth but same will be true for google auth
it('should not let create project if not loggedIn', async () => {
  const res = await request(app)
    .post('/api/project/new')
    .send({ projectName: 'new project' });
  expect(res.body.errors[0].message).toEqual('you are not authorized');
});

it('should throw error if project name is empty string', async () => {
  const cookie = await googleAuthentication();
  const res = await request(app)
    .post('/api/project/new')
    .send({ projectName: '  ' })
    .set('Cookie', cookie);
  expect(res.body.errors[0].message).toEqual('project name can not be empty');
});

it('should throw error if project name is empty string', async () => {
  const cookie = await googleAuthentication();
  const res = await request(app)
    .post('/api/project/new')
    .send({ projectName: '  ' })
    .set('Cookie', cookie);
  expect(res.body.errors[0].message).toEqual('project name can not be empty');
});

/*

commenting this because of memmory leak error

it('should throw error if project name already created by user', async () => {
  const cookie = await googleAuthentication();
  await request(app)
    .post('/api/project/new')
    .send({ projectName: 'project' })
    .set('Cookie', cookie);
  const res = await request(app)
    .post('/api/project/new')
    .send({ projectName: 'project' })
    .set('Cookie', cookie);

  expect(res.body.errors[0].message).toEqual('project name already exist');
});
*/
