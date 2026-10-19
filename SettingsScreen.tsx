import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../store/auth';
import { authenticate } from '../api/xtream';
import { colors } from '../theme';

export default function SettingsScreen() {
  const { session, signOut } = useAuth();
  const [info, setInfo] = useState<any>(null);

  useEffect(() => { authenticate(session!).then(setInfo).catch(() => {}); }, []);

  const exp = info?.exp_date ? new Date(Number(info.exp_date) * 1000).toLocaleDateString() : 'غير محدود';

  return (
    <SafeAreaView style={s.wrap}>
      <Text style={s.h}>حسابي</Text>
      <View style={s.card}>
        <Row k="الحالة" v={info?.status ?? '...'} />
        <Row k="تاريخ الانتهاء" v={info ? exp : '...'} />
        <Row k="الاتصالات المسموحة" v={info?.max_connections ?? '...'} />
      </View>
      <Pressable style={s.btn} onPress={signOut}>
        <Text style={s.btnText}>تسجيل الخروج</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const Row = ({ k, v }: { k: string; v: string }) => (
  <View style={s.row}><Text style={s.k}>{k}</Text><Text style={s.v}>{v}</Text></View>
);

const s = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.bg, padding: 16 },
  h: { color: colors.text, fontSize: 24, fontWeight: '800', marginBottom: 16 },
  card: { backgroundColor: colors.card, borderRadius: 14, padding: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', padding: 12 },
  k: { color: colors.muted }, v: { color: colors.text, fontWeight: '600' },
  btn: { backgroundColor: colors.danger, borderRadius: 14, padding: 16, alignItems: 'center', marginTop: 24 },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
