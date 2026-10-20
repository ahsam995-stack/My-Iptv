import { Session } from '../types';

export async function activate(code: string): Promise<Session> {
  const enteredCode = code.trim();
  
  if (!enteredCode) {
    throw new Error('يرجى كتابة كود التفعيل');
  }

  // قائمة الأكواد المسموحة كلها (أضف أي كود تريد هنا)
  const allowedCodes = ['200171', '202565', '2007114']; 

  // التحقق هل الكود المدخل موجود داخل مصفوفة الأكواد المسموحة
  if (!allowedCodes.includes(enteredCode)) {
    throw new Error('كود التفعيل غير صحيح أو منتهي الصلاحية!');
  }

  // إذا كان الكود موجود وصحيح، يتم فتح التطبيق
  return { 
    server: 'http://local-nilesat', 
    username: enteredCode, 
    password: 'password' 
  };
}
