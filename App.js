import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <View style={styles.header}>
        <Text style={styles.title}>My IPTV App</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.welcomeText}>مرحباً بك في تطبيق IPTV الخاص بك!</Text>
        <Text style={styles.subText}>التطبيق يعمل الآن بنجاح جاهز لإضافة القنوات.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    padding: 20,
    backgroundColor: '#1e1e1e',
    alignItems: 'center',
  },
  title: {
    color: '#00e676',
    fontSize: 22,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeText: {
    color: '#ffffff',
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  subText: {
    color: '#aaa',
    fontSize: 14,
    textAlign: 'center',
  },
});
