import { Session } from '../types';

export async function activate(code: string): Promise<Session> {
  const enteredCode = code.trim();
  
  if (!enteredCode) {
    throw new Error('يرجى كتابة كود التفعيل');
  }

  // كود التفعيل المعتمد
  const validActivationCode = '200171'; 

  if (enteredCode !== validActivationCode) {
    throw new Error('كود التفعيل غير صحيح!');
  }

  // إرجاع جلسة ناجحة تتجنب أخطاء الاتصال
  return { 
    server: 'https://demo.iptv', 
    username: enteredCode, 
    password: 'password' 
  };
}
