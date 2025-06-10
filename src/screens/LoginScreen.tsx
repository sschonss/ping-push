import React from 'react';
import { StyleSheet } from 'react-native';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';

// Components
import { Screen } from '../components/layout/Screen';
import { AppTitle } from '../components/common/AppTitle';
import { LoginForm } from '../components/forms/LoginForm';

export default function LoginScreen() {
  const [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Screen style={styles.container}>
      <AppTitle containerStyle={styles.titleContainer} />
      <LoginForm />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
  },
  titleContainer: {
    marginTop: 60,
    marginBottom: 60,
  },
});