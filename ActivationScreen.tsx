export async function activate(code: string) {
  // الكود السري المخصص من قبلك لتفعيل التطبيق
  const validCode = "200171"; 

  if (code.trim() !== validCode) {
    throw new Error("كود التفعيل غير صحيح، حاول مرة أخرى");
  }

  // البيانات الوهمية لتشغيل المشغل واجتياز شاشة الدخول
  return {
    success: true,
    serverUrl: "http://example.com",
    username: "test_user",
    password: "test_password"
  };
}
