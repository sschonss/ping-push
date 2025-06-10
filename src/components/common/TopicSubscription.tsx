import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  StyleProp, 
  ViewStyle,
  Alert,
  Clipboard 
} from 'react-native';
import { Topic } from '../../types';
import { Timestamp } from 'firebase/firestore';
import { Button } from '../ui/Button';

interface TopicSubscriptionProps {
  topic: Topic;
  isSubscribed: boolean;
  subscriptionToken: string;
  onSubscribe: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

export const TopicSubscription: React.FC<TopicSubscriptionProps> = ({
  topic,
  isSubscribed,
  subscriptionToken,
  onSubscribe,
  containerStyle,
}) => {
  const handleCopyToken = () => {
    Clipboard.setString(subscriptionToken);
    Alert.alert('Success', 'Token copied to clipboard!');
  };

  if (!isSubscribed) {
    return (
      <View style={[styles.container, containerStyle]}>
        <Button
          title="SUBSCRIBE"
          onPress={onSubscribe}
          style={styles.subscribeButton}
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>your token</Text>
      <Text style={styles.tokenText}>{subscriptionToken}</Text>
      
      <Button
        title="COPY TOKEN"
        onPress={handleCopyToken}
        variant="secondary"
        style={styles.copyButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 16,
  },
  label: {
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 8,
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
  subscribeButton: {
    marginVertical: 10,
  },
  copyButton: {
    height: 40,
    backgroundColor: '#333333',
  },
});
