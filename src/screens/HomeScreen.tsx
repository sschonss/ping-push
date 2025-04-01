import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';

type RootStackParamList = {
  Home: undefined;
  CreateTopic: undefined;
  InfoTopic: { topicId: string };
};

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

import { Topic } from '../types';
import { TopicsService } from '../services/topics';

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  useEffect(() => {
    const unsubscribeTopics = TopicsService.subscribeToTopics((updatedTopics) => {
      setTopics(updatedTopics);
      setLoading(false);
    });

    return () => {
      unsubscribeTopics();
    };
  }, []);



  if (!fontsLoaded) {
    return null;
  }

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={[styles.loadingText, { fontFamily: 'PressStart2P_400Regular' }]}>
            Loading topics...
          </Text>
        </View>
      );
    }

    if (topics.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { fontFamily: 'PressStart2P_400Regular' }]}>
            No topics yet
          </Text>
        </View>
      );
    }

    return (
      <FlatList
        data={topics}
        renderItem={renderTopicItem}
        keyExtractor={(item) => item.id}
        style={styles.topicList}
        contentContainerStyle={styles.topicListContent}
      />
    );
  };

  const renderTopicItem = ({ item }: { item: Topic }) => (
    <TouchableOpacity
      style={styles.topicItem}
      onPress={() => navigation.navigate('InfoTopic', { topicId: item.id })}
    >
      <Text style={styles.topicText}>{item.name}</Text>
      <Feather name="chevron-right" size={24} color="#000000" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Ping Push</Text>
        <Text style={styles.subtitleText}>topics</Text>
      </View>

      {renderContent()}

      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate('CreateTopic')}
      >
        <Text style={styles.createButtonText}>Create Topic</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  loadingText: {
    color: '#ffffff',
    marginTop: 20,
    textAlign: 'center',
    fontSize: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 12,
  },
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 80,
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
  subtitleText: {
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 18,
    color: '#FFFFFF',
    marginTop: 10,
  },
  topicList: {
    flex: 1,
  },
  topicListContent: {
    paddingVertical: 10,
  },
  topicItem: {
    backgroundColor: '#D3D3D3',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topicText: {
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 14,
    color: '#000000',
  },
  createButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  createButtonText: {
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 16,
    color: '#000000',
  },
});