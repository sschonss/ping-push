import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Clipboard,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  InfoTopic: { topicId: string };
};

type InfoTopicRouteProp = RouteProp<RootStackParamList, 'InfoTopic'>;
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { TopicsService } from '../services/topics';
import { Topic } from '../types';
import { Timestamp } from 'firebase/firestore';

export default function InfoTopicScreen() {
  const [topic, setTopic] = useState<Topic | null>(null);
  const [subscribed, setSubscribed] = useState(false);
  const [subscriptionToken, setSubscriptionToken] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigation = useNavigation();
  const route = useRoute<InfoTopicRouteProp>();

  const [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  useEffect(() => {
    const unsubscribeTopics = TopicsService.subscribeToTopics((topics) => {
      const topicId = route.params?.topicId;
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
  }, [route.params?.topicId]);

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
                navigation.goBack();
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
        <Text style={[styles.loadingText, { fontFamily: 'PressStart2P_400Regular' }]}>
          Loading topic...
        </Text>
      </View>
    );
  }

  if (!topic) {
    return (
      <View style={styles.errorContainer}>
        <Text style={[styles.errorText, { fontFamily: 'PressStart2P_400Regular' }]}>
          Topic not found
        </Text>
        <TouchableOpacity 
          style={styles.backButtonLink}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.backButtonText, { fontFamily: 'PressStart2P_400Regular' }]}>
            ← Back to Home
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>TOPIC</Text>
        <Text style={styles.titleText}>INFO</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>name</Text>
        <Text style={styles.value}>{topic.name}</Text>

        <Text style={styles.label}>created at</Text>
        <Text style={styles.value}>
          {(topic.createdAt instanceof Timestamp ? topic.createdAt.toDate() : new Date(topic.createdAt)).toLocaleDateString()}
        </Text>

        {!subscribed ? (
          <TouchableOpacity style={styles.subscribeButton} onPress={handleSubscribe}>
            <Text style={styles.subscribeButtonText}>SUBSCRIBE</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.tokenContainer}>
            <Text style={styles.label}>your token</Text>
            <Text style={styles.tokenText}>{subscriptionToken}</Text>
            <TouchableOpacity style={styles.copyButton} onPress={handleCopyToken}>
              <Text style={styles.copyButtonText}>COPY TOKEN</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButtonLink}
        >
          <Text style={styles.backButtonText}>← Back to Home</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.deleteButton} 
          onPress={handleDelete}
        >
          <Text style={styles.deleteButtonText}>DELETE TOPIC</Text>
        </TouchableOpacity>
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
  infoContainer: {
    width: '100%',
    alignItems: 'flex-start',
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
    marginBottom: 24,
  },
  subscribeButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  subscribeButtonText: {
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 16,
    color: '#000000',
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
  copyButton: {
    width: '100%',
    height: 40,
    backgroundColor: '#333333',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  copyButtonText: {
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 12,
    color: '#FFFFFF',
  },
  backButtonLink: {
    marginTop: 40,
    marginBottom: 20,
  },
  backButtonText: {
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 12,
    color: '#FFFFFF',
    textDecorationLine: 'underline',
  },
  deleteButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#FF0000',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#FF0000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  deleteButtonText: {
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 16,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
});
