import request from 'supertest';
import { app } from '../../../app';
import { googleMockProfile } from '../../../config/mocks/googleMockProfile';
import { googleAuthentication } from '../../../test/googleAuth';
import { twitterMockProfile } from '../../../config/mocks/twitterMockProfile';
import { twitterAuthentication } from '../../../test/twitterAuth';

it('returns current_user  with google-oauth', async () => {
  const cookie = await googleAuthentication();
  const res = await request(app)
    .get('/api/current_user')
    .set('Cookie', cookie)
    .expect(200);
  expect(res.body.googleId).toEqual(googleMockProfile.id);
  expect(res.body.name).toEqual(googleMockProfile.displayName);
  expect(res.body.email).toEqual(googleMockProfile._json.email);
});

it('returns current_user  with twitter-oauth', async () => {
  const cookie = await twitterAuthentication();
  const res = await request(app)
    .get('/api/current_user')
    .set('Cookie', cookie)
    .expect(200);
  expect(res.body.twitterId).toEqual(twitterMockProfile._json.id_str);
  expect(res.body.name).toEqual(twitterMockProfile._json.screen_name);
  expect(res.body.email).toEqual(twitterMockProfile._json.email);
});

it('logout twitter-oauth', async () => {
  const cookie = await twitterAuthentication();
  const res = await request(app)
    .get('/api/logout')
    .set('Cookie', cookie)
    .expect(200);
  expect(res.get('Set-Cookie')[0]).toEqual(
    'express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly',
  );
});

it('logout google-oauth', async () => {
  const cookie = await googleAuthentication();
  const res = await request(app)
    .get('/api/logout')
    .set('Cookie', cookie)
    .expect(200);
  expect(res.get('Set-Cookie')[0]).toEqual(
    'express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly',
  );
});
