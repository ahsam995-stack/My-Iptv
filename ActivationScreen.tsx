export async function activate(code: string) {
  const validCode = "200171";

  if (code.trim() !== validCode) {
    throw new Error("كود التفعيل غير صحيح، حاول مرة أخرى");
  }

  return {
    success: true,
    serverUrl: "http://example.com",
    username: "test_user",
    password: "test_password"
  };
}
