import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Topic } from '../../types';
import { Timestamp } from 'firebase/firestore';

interface TopicDetailsProps {
  topic: Topic;
  containerStyle?: StyleProp<ViewStyle>;
}

export const TopicDetails: React.FC<TopicDetailsProps> = ({ topic, containerStyle }) => {
  const formatDate = (timestamp: any): string => {
    if (timestamp instanceof Timestamp) {
      return timestamp.toDate().toLocaleDateString();
    } else if (timestamp) {
      return new Date(timestamp).toLocaleDateString();
    }
    return 'Unknown date';
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>name</Text>
      <Text style={styles.value}>{topic.name}</Text>

      <Text style={styles.label}>created at</Text>
      <Text style={styles.value}>{formatDate(topic.createdAt)}</Text>
      
      {topic.createdBy && (
        <>
          <Text style={styles.label}>created by</Text>
          <Text style={styles.value}>{topic.createdBy}</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
});
