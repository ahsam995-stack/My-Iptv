import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../store/auth';
import { colors } from '../theme';
import ActivationScreen from '../screens/ActivationScreen';
import BrowseScreen from '../screens/BrowseScreen';
import SeriesDetailScreen from '../screens/SeriesDetailScreen';
import PlayerScreen from '../screens/PlayerScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Live = () => <BrowseScreen kind="live" />;
const Movies = () => <BrowseScreen kind="movie" />;
const Series = () => <BrowseScreen kind="series" />;

function Tabs() {
  const icon = (name: any) => ({ color, size }: any) => <Ionicons name={name} color={color} size={size} />;
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: colors.primary }}>
      <Tab.Screen name="Live" component={Live} options={{ title: 'البث المباشر', tabBarIcon: icon('tv') }} />
      <Tab.Screen name="Movies" component={Movies} options={{ title: 'الأفلام', tabBarIcon: icon('film') }} />
      <Tab.Screen name="Series" component={Series} options={{ title: 'المسلسلات', tabBarIcon: icon('albums') }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'الحساب', tabBarIcon: icon('person') }} />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  const { session, loading } = useAuth();
  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, justifyContent: 'center' }}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {session ? (
        <>
          <Stack.Screen name="Tabs" component={Tabs} />
          <Stack.Screen name="SeriesDetail" component={SeriesDetailScreen} options={{ headerShown: true, title: '' }} />
          <Stack.Screen name="Player" component={PlayerScreen} options={{ animation: 'fade' }} />
        </>
      ) : (
        <Stack.Screen name="Activation" component={ActivationScreen} />
      )}
    </Stack.Navigator>
  );
}
