import { ACTIVATION_API_URL } from '../config';
import { Session } from '../types';
import { fetchJson } from './http';

const normalize = (s: string) => s.trim().replace(/\/+$/, '');

// يرسل الكود إلى سيرفرك فيعيد بيانات Xtream: { server, username, password }
export async function activate(code: string): Promise<Session> {
  const data = await fetchJson(ACTIVATION_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: code.trim() }),
  });
  if (!data?.server || !data?.username || !data?.password) {
    throw new Error('كود التفعيل غير صالح');
  }
  return { server: normalize(data.server), username: data.username, password: data.password };
}
