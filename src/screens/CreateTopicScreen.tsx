import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';

// Components
import { Screen } from '../components/layout/Screen';
import { CreateTopicForm } from '../components/forms/CreateTopicForm';

export default function CreateTopicScreen() {
  const [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Screen style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>CREATE</Text>
        <Text style={styles.titleText}>TOPIC</Text>
      </View>

      <CreateTopicForm containerStyle={styles.formContainer} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  titleText: {
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 36,
    color: '#FFFFFF',
    textShadowColor: 'rgba(255, 255, 255, 0.4)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
    marginVertical: 5,
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
});
