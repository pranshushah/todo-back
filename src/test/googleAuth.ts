import { app } from '../app';
import request from 'supertest';
export async function googleAuthentication() {
  const response = await request(app).get('/api/auth/google').expect(200);
  const cookie = response.get('Set-Cookie');
  return cookie;
}
