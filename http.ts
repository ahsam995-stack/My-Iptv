import { REQUEST_TIMEOUT_MS } from '../config';

export async function fetchJson<T = any>(url: string, init: RequestInit = {}): Promise<T> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), REQUEST_TIMEOUT_MS);
  try {
    const res = await fetch(url, { ...init, signal: ctrl.signal });
    if (!res.ok) throw new Error(`خطأ في الاتصال (${res.status})`);
    return (await res.json()) as T;
  } catch (e: any) {
    if (e?.name === 'AbortError') throw new Error('انتهت مهلة الاتصال');
    throw e;
  } finally {
    clearTimeout(timer);
  }
}
