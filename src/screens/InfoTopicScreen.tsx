import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { Timestamp } from 'firebase/firestore';

// Services & Types
import { TopicsService } from '../services/topics';
import { Topic } from '../types';

// Components
import { Screen } from '../components/layout/Screen';
import { TopicDetails } from '../components/common/TopicDetails';
import { TopicSubscription } from '../components/common/TopicSubscription';
import { Button } from '../components/ui/Button';
import { DeleteButton } from '../components/ui/DeleteButton';

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

  const handleBackToHome = () => {
    router.back();
  };

  if (!fontsLoaded) {
    return null;
  }

  if (isLoading) {
    return (
      <Screen style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={styles.loadingText}>
            Loading topic...
          </Text>
        </View>
      </Screen>
    );
  }

  if (!topic) {
    return (
      <Screen style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            Topic not found
          </Text>
          <Button 
            title="← Back to Home"
            onPress={handleBackToHome}
            variant="outline"
            style={styles.backButton}
          />
        </View>
      </Screen>
    );
  }

  return (
    <Screen style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>TOPIC</Text>
        <Text style={styles.titleText}>INFO</Text>
      </View>

      <View style={styles.content}>
        <TopicDetails topic={topic} />

        <TopicSubscription 
          topic={topic}
          isSubscribed={subscribed}
          subscriptionToken={subscriptionToken}
          onSubscribe={handleSubscribe}
        />

        <Button 
          title="← Back to Home"
          onPress={handleBackToHome}
          variant="outline"
          style={styles.backButton}
          textStyle={styles.backButtonText}
        />

        <DeleteButton 
          title="DELETE TOPIC"
          onPress={handleDelete}
          loading={isDeleting}
          disabled={isDeleting}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorText: {
    fontFamily: 'PressStart2P_400Regular',
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
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
  content: {
    width: '100%',
    flex: 1,
    paddingHorizontal: 20,
  },
  backButton: {
    marginTop: 30,
    marginBottom: 10,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  backButtonText: {
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 12,
    color: '#FFFFFF',
    textDecorationLine: 'underline',
  },
});
