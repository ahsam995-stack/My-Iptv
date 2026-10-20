import { Session } from '../types';

export async function activate(code: string): Promise<Session> {
  const trimmedCode = code.trim();
  
  if (!trimmedCode) {
    throw new Error('اكتب كود التفعيل');
  }

  // إذا تم إدخال كود تفعيل تجريبي أو أي كود، نقوم بتوجيهه للاعتماد على النظام المحلي
  return { 
    server: 'http://local-nilesat', 
    username: trimmedCode, 
    password: 'password' 
  };
}
