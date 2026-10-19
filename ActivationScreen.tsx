import React, { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput } from 'react-native';
import { useAuth } from '../store/auth';
import { colors } from '../theme';

export default function ActivationScreen() {
  const { signIn } = useAuth();
  const [code, setCode] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const submit = async () => {
    if (code.trim().length < 4) return setError('أدخل كود التفعيل');
    setBusy(true);
    setError('');
    try {
      await signIn(code);
    } catch (e: any) {
      setError(e.message || 'حدث خطأ غير متوقع');
    } finally {
      setBusy(false);
    }
  };

  return (
    <KeyboardAvoidingView style={s.wrap} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Text style={s.logo}>IPTV</Text>
      <Text style={s.sub}>أدخل كود التفعيل للمتابعة</Text>
      <TextInput
        style={s.input}
        value={code}
        onChangeText={setCode}
        placeholder="XXXX-XXXX"
        placeholderTextColor={colors.muted}
        autoCapitalize="characters"
        autoCorrect={false}
        onSubmitEditing={submit}
      />
      {!!error && <Text style={s.error}>{error}</Text>}
      <Pressable style={[s.btn, busy && { opacity: 0.6 }]} onPress={submit} disabled={busy}>
        {busy ? <ActivityIndicator color="#fff" /> : <Text style={s.btnText}>تفعيل</Text>}
      </Pressable>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.bg, justifyContent: 'center', padding: 28 },
  logo: { color: colors.primary, fontSize: 48, fontWeight: '800', textAlign: 'center' },
  sub: { color: colors.muted, textAlign: 'center', marginBottom: 28, marginTop: 6 },
  input: { backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1, borderRadius: 14, color: colors.text, fontSize: 20, padding: 16, textAlign: 'center', letterSpacing: 3 },
  error: { color: colors.danger, textAlign: 'center', marginTop: 12 },
  btn: { backgroundColor: colors.primary, borderRadius: 14, padding: 16, alignItems: 'center', marginTop: 18 },
  btnText: { color: '#fff', fontSize: 17, fontWeight: '700' },
});
