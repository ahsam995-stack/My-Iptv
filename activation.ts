import { Session } from '../types';

export async function activate(code: string): Promise<Session> {
  if (!code.trim()) {
    throw new Error('اكتب كود التفعيل');
  }
  return { server: 'http://demo', username: 'demo', password: 'demo' };
}
