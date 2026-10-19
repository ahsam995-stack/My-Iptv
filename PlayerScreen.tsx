import React, { useEffect } from 'react';
import { ActivityIndicator, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

export default function PlayerScreen({ route, navigation }: any) {
  const { url, title, live } = route.params as { url: string; title: string; live?: boolean };

  const player = useVideoPlayer(url, (p) => {
    p.loop = false;
    p.play();
  });
  const { status } = useEvent(player, 'statusChange', { status: player.status });

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE).catch(() => {});
    StatusBar.setHidden(true);
    return () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP).catch(() => {});
      StatusBar.setHidden(false);
    };
  }, []);

  return (
    <View style={s.wrap}>
      <VideoView player={player} style={s.video} nativeControls allowsPictureInPicture contentFit="contain" />
      <Pressable style={s.back} onPress={() => navigation.goBack()} hitSlop={12}>
        <Ionicons name="arrow-back" size={26} color="#fff" />
        <Text style={s.title} numberOfLines={1}>{title}{live ? '  •  مباشر' : ''}</Text>
      </Pressable>
      {status === 'loading' && <ActivityIndicator style={StyleSheet.absoluteFill} size="large" color={colors.primary} />}
      {status === 'error' && <Text style={s.err}>تعذّر تشغيل هذا المحتوى</Text>}
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: '#000' },
  video: { flex: 1 },
  back: { position: 'absolute', top: 16, left: 16, right: 16, flexDirection: 'row', alignItems: 'center', gap: 10 },
  title: { color: '#fff', fontSize: 16, fontWeight: '700', flex: 1 },
  err: { position: 'absolute', alignSelf: 'center', top: '45%', color: colors.danger, fontSize: 16 },
});
