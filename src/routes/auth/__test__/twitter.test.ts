import request from 'supertest';
import { app } from '../../../app';
// importing twitter strategy

it('returns cookie successful authentication with twitter-oauth', async () => {
  const res = await request(app).get('/api/auth/twitter').expect(200);
  expect(res.get('Set-Cookie')).toBeDefined();
});
