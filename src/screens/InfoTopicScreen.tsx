import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Alert,
  Clipboard,
  ActivityIndicator,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { TopicsService } from '../services/topics';
import { Topic } from '../types';
import { Timestamp } from 'firebase/firestore';
import { View, Text } from '../components/StyledComponents';
import { Button, Card } from '../components/ui';

export default function InfoTopicScreen() {
  const [topic, setTopic] = useState<Topic | null>(null);
  const [subscribed, setSubscribed] = useState(false);
  const [subscriptionToken, setSubscriptionToken] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const { topicId } = useLocalSearchParams<{ topicId: string }>();

  const [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  useEffect(() => {
    const unsubscribeTopics = TopicsService.subscribeToTopics((topics) => {

      if (topicId) {
        const foundTopic = topics.find(t => t.id === topicId);
        if (foundTopic) {
          setTopic(foundTopic);
          const timestamp = foundTopic.createdAt instanceof Timestamp ? foundTopic.createdAt.toMillis() : Date.now();
          setSubscriptionToken(`${foundTopic.name}-${timestamp}`);
        } else {
          setTopic(null);
        }
      }
      setIsLoading(false);
    });

    return () => {
      unsubscribeTopics();
    };
  }, [topicId]);

  useEffect(() => {
    if (topic) {
      const timestamp = topic.createdAt instanceof Timestamp ? topic.createdAt.toMillis() : Date.now();
      setSubscriptionToken(`${topic.name}-${timestamp}`);
    }
  }, [topic]);

  const handleSubscribe = () => {
    setSubscribed(true);
    Alert.alert('Subscribed!', 'You are now subscribed to this topic.');
  };

  const handleDelete = async () => {
    Alert.alert(
      'Delete Topic',
      'Are you sure you want to delete this topic? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            if (topic?.id) {
              try {
                setIsDeleting(true);
                await TopicsService.deleteTopic(topic.id);
                router.back();
              } catch (error) {
                Alert.alert('Error', 'Failed to delete topic. Please try again.');
              } finally {
                setIsDeleting(false);
              }
            }
          },
        },
      ],
    );
  };

  const handleCopyToken = () => {
    Clipboard.setString(subscriptionToken);
    Alert.alert('Success', 'Token copied to clipboard!');
  };

  if (!fontsLoaded) {
    return null;
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.loadingText}>
          Loading topic...
        </Text>
      </View>
    );
  }

  if (!topic) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Topic not found
        </Text>
        <Button
          title="← Back to Home"
          variant="outline"
          size="small"
          onPress={() => router.back()}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>TOPIC</Text>
        <Text style={styles.titleText}>INFO</Text>
      </View>

      <Card variant="elevated">
        <View style={styles.infoRow}>
          <Text style={styles.label}>name</Text>
          <Text style={styles.value}>{topic.name}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>created at</Text>
          <Text style={styles.value}>
            {(topic.createdAt instanceof Timestamp ? topic.createdAt.toDate() : new Date(topic.createdAt)).toLocaleDateString()}
          </Text>
        </View>

        {!subscribed ? (
          <Button
            title="SUBSCRIBE"
            variant="primary"
            onPress={handleSubscribe}
            fullWidth
          />
        ) : (
          <View style={styles.tokenContainer}>
            <Text style={styles.label}>your token</Text>
            <Text style={styles.tokenText}>{subscriptionToken}</Text>
            <Button
              title="COPY TOKEN"
              variant="secondary"
              size="small"
              onPress={handleCopyToken}
              fullWidth
            />
          </View>
        )}
      </Card>

      <View style={styles.actionButtons}>
        <Button
          title="← Back to Home"
          variant="outline"
          size="small"
          onPress={() => router.back()}
          fullWidth
        />
        
        <Button
          title="DELETE TOPIC"
          variant="danger"
          onPress={handleDelete}
          fullWidth
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontFamily: 'PressStart2P_400Regular',
    color: '#ffffff',
    marginTop: 20,
    fontSize: 12,
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontFamily: 'PressStart2P_400Regular',
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 20,
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
  infoRow: {
    marginBottom: 24,
  },
  label: {
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  value: {
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 16,
    color: '#D3D3D3',
  },
  tokenContainer: {
    width: '100%',
    marginTop: 20,
  },
  tokenText: {
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 12,
    color: '#D3D3D3',
    backgroundColor: '#1A1A1A',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  actionButtons: {
    marginTop: 24,
    gap: 16,
  }
});
