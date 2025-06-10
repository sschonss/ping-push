import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { router } from 'expo-router';

import { Topic } from '../types';
import { TopicsService } from '../services/topics';

// Componentes
import { Screen } from '../components/layout/Screen';
import { AppTitle } from '../components/common/AppTitle';
import { Button } from '../components/ui/Button';
import { TopicsList } from '../components/common/TopicsList';

export default function HomeScreen() {
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

  const handleTopicPress = (topic: Topic) => {
    router.push(`/info-topic?topicId=${topic.id}`);
  };

  const handleCreateTopicPress = () => {
    router.push('/create-topic');
  };

  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <AppTitle size="medium" containerStyle={styles.titleContainer} />
        <Text style={styles.subtitleText}>topics</Text>
      </View>

      <View style={styles.content}>
        <TopicsList
          topics={topics}
          loading={loading}
          onTopicPress={handleTopicPress}
          style={styles.topicList}
        />
      </View>

      <Button 
        title="Create Topic"
        onPress={handleCreateTopicPress}
        style={styles.createButton}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  subtitleText: {
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 18,
    color: '#FFFFFF',
    marginTop: 10,
  },
  content: {
    flex: 1,
    marginVertical: 10,
  },
  topicList: {
    flex: 1,
  },
  createButton: {
    marginVertical: 20,
  },
});