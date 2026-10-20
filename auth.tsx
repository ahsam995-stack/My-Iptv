// اجعل الجلسة تبدأ مباشرة وتتجاوز شاشة التفعيل
export const useAuth = create((set) => ({
  session: { server: 'http://local', username: '200171', password: 'password' },
  loading: false,
  login: async (code: string) => {
    if (code.trim() !== '200171') {
      throw new Error('كود التفعيل غير صحيح');
    }
    set({ session: { server: 'http://local', username: code, password: 'password' } });
  },
  logout: () => set({ session: null }),
}));
