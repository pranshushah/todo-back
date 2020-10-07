import request from 'supertest';
import { app } from '../../../app';

it('returns cookie successful authentication with google-oauth', async () => {
  const res = await request(app).get('/api/auth/google').expect(200);
  expect(res.get('Set-Cookie')).toBeDefined();
});
