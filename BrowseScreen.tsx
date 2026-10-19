import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../store/auth';
import { Category, Item, Kind } from '../types';
import * as api from '../api/xtream';
import CategoryChips from '../components/CategoryChips';
import { colors } from '../theme';

const COLS = 3;

export default function BrowseScreen({ kind }: { kind: Kind }) {
  const { session } = useAuth();
  const nav = useNavigation<any>();
  const [cats, setCats] = useState<Category[]>([]);
  const [cat, setCat] = useState<string | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.getCategories(session!, kind)
      .then((c) => { setCats(c); setCat(c[0]?.category_id ?? null); if (!c.length) setLoading(false); })
      .catch((e) => { setError(e.message); setLoading(false); });
  }, [kind]);

  useEffect(() => {
    if (cat === null) return;
    setLoading(true);
    setError('');
    api.getItems(session!, kind, cat)
      .then(setItems)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [cat]);

  const data = useMemo(() => {
    const t = q.trim().toLowerCase();
    return t ? items.filter((i) => i.name.toLowerCase().includes(t)) : items;
  }, [items, q]);

  const open = (it: Item) => {
    if (kind === 'series') return nav.navigate('SeriesDetail', { id: it.id, name: it.name });
    const url = kind === 'live' ? api.liveUrl(session!, it.id) : api.movieUrl(session!, it.id, it.ext || 'mp4');
    nav.navigate('Player', { url, title: it.name, live: kind === 'live' });
  };

  const isLive = kind === 'live';
  return (
    <SafeAreaView style={s.wrap} edges={['top']}>
      <TextInput style={s.search} value={q} onChangeText={setQ} placeholder="بحث..." placeholderTextColor={colors.muted} />
      <CategoryChips data={cats} selected={cat} onSelect={setCat} />
      {loading ? (
        <ActivityIndicator color={colors.primary} style={{ marginTop: 40 }} />
      ) : error ? (
        <Text style={s.error}>{error}</Text>
      ) : (
        <FlatList
          key={isLive ? 'list' : 'grid'}
          data={data}
          numColumns={isLive ? 1 : COLS}
          keyExtractor={(i) => String(i.id)}
          initialNumToRender={12}
          maxToRenderPerBatch={12}
          windowSize={7}
          removeClippedSubviews
          contentContainerStyle={{ padding: 12, gap: 10 }}
          columnWrapperStyle={isLive ? undefined : { gap: 10 }}
          renderItem={({ item }) =>
            isLive ? (
              <Pressable style={s.row} onPress={() => open(item)}>
                {item.image ? <Image source={{ uri: item.image }} style={s.logo} resizeMode="contain" /> : <View style={s.logo} />}
                <Text style={s.rowText} numberOfLines={1}>{item.name}</Text>
              </Pressable>
            ) : (
              <Pressable style={s.card} onPress={() => open(item)}>
                {item.image ? <Image source={{ uri: item.image }} style={s.poster} /> : <View style={s.poster} />}
                <Text style={s.cardText} numberOfLines={2}>{item.name}</Text>
              </Pressable>
            )
          }
          ListEmptyComponent={<Text style={s.error}>لا توجد نتائج</Text>}
        />
      )}
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.bg },
  search: { backgroundColor: colors.card, color: colors.text, margin: 12, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10, borderWidth: 1, borderColor: colors.border },
  error: { color: colors.muted, textAlign: 'center', marginTop: 40 },
  row: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card, borderRadius: 12, padding: 10, gap: 12 },
  logo: { width: 48, height: 48, borderRadius: 8, backgroundColor: colors.border },
  rowText: { color: colors.text, fontSize: 15, flex: 1 },
  card: { flex: 1 / COLS },
  poster: { aspectRatio: 2 / 3, borderRadius: 10, backgroundColor: colors.border },
  cardText: { color: colors.text, fontSize: 12, marginTop: 6 },
});
