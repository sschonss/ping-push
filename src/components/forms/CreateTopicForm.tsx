import React, { useState } from 'react';
import { StyleSheet, View, StyleProp, ViewStyle, Alert } from 'react-native';
import { router } from 'expo-router';
import { TopicsService } from '../../services/topics';

import { LabeledInput } from '../ui/LabeledInput';
import { Button } from '../ui/Button';

interface CreateTopicFormProps {
  containerStyle?: StyleProp<ViewStyle>;
  onTopicCreated?: (topicId: string) => void;
}

export const CreateTopicForm: React.FC<CreateTopicFormProps> = ({
  containerStyle,
  onTopicCreated,
}) => {
  const [topicName, setTopicName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const validateForm = () => {
    if (!topicName.trim()) {
      setError('Please enter a topic name');
      return false;
    }
    setError(undefined);
    return true;
  };

  const handleCreateTopic = async () => {
    if (!validateForm() || loading) {
      return;
    }

    try {
      setLoading(true);
      const newTopic = {
        name: topicName.trim(),
        createdBy: 'current-user', // Idealmente, isso viria do usuário autenticado
      };

      const topicId = await TopicsService.addTopic(newTopic);
      if (topicId) {
        if (onTopicCreated) {
          onTopicCreated(topicId);
        } else {
          router.replace('/home');
        }
      } else {
        Alert.alert('Error', 'Failed to create topic');
      }
    } catch (error) {
      console.error('Error creating topic:', error);
      Alert.alert('Error', 'Failed to create topic');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <View style={[styles.formContainer, containerStyle]}>
      <LabeledInput
        label="topic name"
        value={topicName}
        onChangeText={setTopicName}
        placeholder="Enter topic name"
        autoCapitalize="none"
        error={error}
      />

      <Button
        title="CREATE"
        onPress={handleCreateTopic}
        loading={loading}
        disabled={loading}
        style={styles.createButton}
      />

      <Button
        title="cancel"
        onPress={handleCancel}
        variant="outline"
        style={styles.cancelButton}
        textStyle={styles.cancelButtonText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  createButton: {
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    marginTop: 20,
  },
  cancelButtonText: {
    fontSize: 12,
    textDecorationLine: 'underline',
  },
});
