# IPTV Activation App (Expo + React Native)

تطبيق IPTV يسجّل الدخول بكود تفعيل فقط، ويتصل بـ Xtream Codes API في الخلفية.

## التشغيل
```bash
npx create-expo-app@latest iptv-app --template blank-typescript
cd iptv-app
npx expo install expo-video expo-secure-store expo-screen-orientation expo-status-bar \
  @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs \
  react-native-screens react-native-safe-area-context @expo/vector-icons
# انسخ App.tsx و src/ و server/ فوق المشروع
# عدّل src/config.ts ليشير إلى سيرفر التفعيل
npx expo prebuild   # expo-video يحتاج development build
npx expo run:android   # أو run:ios
```

## سيرفر التفعيل
`cd server && npm i && npm start` ثم ضع رابطه في `src/config.ts`.
يستقبل `POST /api/activate {code}` ويرجع `{server, username, password}`.

> التطبيق مشغّل فقط ولا يتضمن أي محتوى. استخدم اشتراكات وخدمات مرخّصة.
