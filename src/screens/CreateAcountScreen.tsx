import React from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';

// Components
import { Screen } from '../components/layout/Screen';
import { AppTitle } from '../components/common/AppTitle';
import { CreateAccountForm } from '../components/forms/CreateAccountForm';

export default function CreateAccountScreen() {
  const [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const content = (
    <>
      <AppTitle containerStyle={styles.titleContainer} />
      <CreateAccountForm />
    </>
  );

  // Use KeyboardAvoidingView em iOS para melhor experiência com teclado
  if (Platform.OS === 'ios') {
    return (
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.container}
      >
        <Screen padding={false} style={styles.innerContainer}>
          {content}
        </Screen>
      </KeyboardAvoidingView>
    );
  }

  return (
    <Screen style={styles.container}>
      {content}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  titleContainer: {
    marginTop: 60,
    marginBottom: 40,
  },
});