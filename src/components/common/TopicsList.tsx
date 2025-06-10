import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  ActivityIndicator,
  StyleProp,
  ViewStyle
} from 'react-native';
import { Topic } from '../../types';
import { TopicItem } from '../ui/TopicItem';

interface TopicsListProps {
  topics: Topic[];
  loading: boolean;
  onTopicPress: (topic: Topic) => void;
  style?: StyleProp<ViewStyle>;
}

export const TopicsList: React.FC<TopicsListProps> = ({
  topics,
  loading,
  onTopicPress,
  style
}) => {
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
      renderItem={({ item }) => (
        <TopicItem 
          topic={item} 
          onPress={onTopicPress} 
        />
      )}
      keyExtractor={(item) => item.id}
      style={[styles.topicList, style]}
      contentContainerStyle={styles.topicListContent}
      showsVerticalScrollIndicator={false}
    />
  );
};

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
  topicList: {
    flex: 1,
  },
  topicListContent: {
    paddingVertical: 10,
  },
});
