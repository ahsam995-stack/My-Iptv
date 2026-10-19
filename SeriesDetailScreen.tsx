import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../store/auth';
import { getSeriesInfo, episodeUrl } from '../api/xtream';
import { SeriesInfo } from '../types';
import { colors } from '../theme';

export default function SeriesDetailScreen({ route, navigation }: any) {
  const { id, name } = route.params;
  const { session } = useAuth();
  const [info, setInfo] = useState<SeriesInfo | null>(null);
  const [season, setSeason] = useState<string>('');
  const [error, setError] = useState('');

  useEffect(() => {
    getSeriesInfo(session!, id)
      .then((d) => { setInfo(d); setSeason(Object.keys(d.episodes ?? {})[0] ?? ''); })
      .catch((e) => setError(e.message));
  }, [id]);

  if (error) return <Text style={s.msg}>{error}</Text>;
  if (!info) return <ActivityIndicator color={colors.primary} style={{ marginTop: 60 }} />;

  const seasons = Object.keys(info.episodes ?? {});
  const eps = info.episodes?.[season] ?? [];

  return (
    <ScrollView style={s.wrap}>
      {info.info?.cover ? <Image source={{ uri: info.info.cover }} style={s.cover} resizeMode="cover" /> : null}
      <Text style={s.title}>{info.info?.name || name}</Text>
      {!!info.info?.plot && <Text style={s.plot}>{info.info.plot}</Text>}

      <FlatList
        horizontal
        data={seasons}
        keyExtractor={(x) => x}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8, paddingHorizontal: 12, marginVertical: 12 }}
        renderItem={({ item }) => (
          <Pressable onPress={() => setSeason(item)} style={[s.chip, item === season && s.chipActive]}>
            <Text style={{ color: item === season ? '#fff' : colors.muted, fontWeight: '600' }}>الموسم {item}</Text>
          </Pressable>
        )}
      />

      {eps.map((e) => (
        <Pressable
          key={e.id}
          style={s.ep}
          onPress={() => navigation.navigate('Player', { url: episodeUrl(session!, e.id, e.container_extension || 'mp4'), title: e.title })}
        >
          <Text style={s.epNum}>{e.episode_num}</Text>
          <Text style={s.epTitle} numberOfLines={1}>{e.title}</Text>
        </Pressable>
      ))}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.bg },
  msg: { color: colors.muted, textAlign: 'center', marginTop: 60 },
  cover: { width: '100%', height: 220, backgroundColor: colors.border },
  title: { color: colors.text, fontSize: 22, fontWeight: '800', padding: 12, paddingBottom: 4 },
  plot: { color: colors.muted, paddingHorizontal: 12, lineHeight: 20 },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: colors.card },
  chipActive: { backgroundColor: colors.primary },
  ep: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.card, marginHorizontal: 12, marginBottom: 8, padding: 14, borderRadius: 12 },
  epNum: { color: colors.primary, fontWeight: '800', width: 28 },
  epTitle: { color: colors.text, flex: 1 },
});
