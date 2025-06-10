import React from 'react';
import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Topic } from '../../types';

interface TopicItemProps {
  topic: Topic;
  onPress: (topic: Topic) => void;
  style?: StyleProp<ViewStyle>;
}

export const TopicItem: React.FC<TopicItemProps> = ({ 
  topic, 
  onPress, 
  style 
}) => {
  return (
    <TouchableOpacity
      style={[styles.topicItem, style]}
      onPress={() => onPress(topic)}
      activeOpacity={0.7}
    >
      <Text style={styles.topicText}>{topic.name}</Text>
      <Feather name="chevron-right" size={24} color="#000000" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
    flex: 1, // Para garantir que o texto não ultrapasse o botão
    marginRight: 8,
  },
});
