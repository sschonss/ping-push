import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { TopicsService } from '../services/topics';
import { serverTimestamp } from 'firebase/firestore';

export default function CreateTopicScreen() {
  const [topicName, setTopicName] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  const handleCreateTopic = async () => {
    if (isLoading || !topicName.trim()) {
      Alert.alert('Error', 'Please enter a topic name');
      return;
    }

    try {
      setIsLoading(true);
      const newTopic = {
        name: topicName.trim(),
        createdBy: 'current-user', 
      };

      const topicId = await TopicsService.addTopic(newTopic);
      if (topicId) {
        router.replace('/home');
      } else {
        Alert.alert('Error', 'Failed to create topic');
      }
    } catch (error) {
      console.error('Error creating topic:', error);
      Alert.alert('Error', 'Failed to create topic');
    } finally {
      setIsLoading(false);
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>CREATE</Text>
        <Text style={styles.titleText}>TOPIC</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>topic name</Text>
        <TextInput
          style={styles.input}
          value={topicName}
          onChangeText={setTopicName}
          placeholder="Enter topic name"
          placeholderTextColor="#666"
          autoCapitalize="none"
        />

        <TouchableOpacity 
          style={[styles.createButton, isLoading && styles.createButtonDisabled]} 
          onPress={handleCreateTopic}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#000000" />
          ) : (
            <Text style={styles.createButtonText}>CREATE</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.cancelButton} 
          onPress={() => router.back()}
        >
          <Text style={styles.cancelButtonText}>cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  createButtonDisabled: {
    opacity: 0.7,
  },
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 80,
    marginBottom: 60,
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
    alignItems: 'center',
  },
  label: {
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 14,
    color: '#FFFFFF',
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#D3D3D3',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 20,
    fontFamily: 'PressStart2P_400Regular',
  },
  createButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  createButtonText: {
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 16,
    color: '#000000',
  },
  cancelButton: {
    marginTop: 20,
  },
  cancelButtonText: {
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 12,
    color: '#FFFFFF',
    textDecorationLine: 'underline',
  },
});
