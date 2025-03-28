import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';

type RootStackParamList = {
  Home: undefined;
  CreateTopic: undefined;
  TopicDetails: { topicId: string };
};

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface Topic {
  id: string;
  name: string;
}

// Temporary mock data for topics
const mockTopics: Topic[] = [
  { id: '1', name: 'general' },
  { id: '2', name: 'announcements' },
  { id: '3', name: 'help' },
  { id: '4', name: 'random' },
  { id: '5', name: 'events' },
  { id: '6', name: 'feedback' },
];

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const renderTopicItem = ({ item }: { item: Topic }) => (
    <TouchableOpacity
      style={styles.topicItem}
      onPress={() => navigation.navigate('TopicDetails', { topicId: item.id })}
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

      <FlatList
        data={mockTopics}
        renderItem={renderTopicItem}
        keyExtractor={(item) => item.id}
        style={styles.topicList}
        contentContainerStyle={styles.topicListContent}
      />

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