import { app } from '../app';
import request from 'supertest';
export async function twitterAuthentication() {
  const response = await request(app).get('/api/auth/twitter').expect(200);
  const cookie = response.get('Set-Cookie');
  return cookie;
}
