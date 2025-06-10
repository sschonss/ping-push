import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';

interface AppTitleProps {
  containerStyle?: StyleProp<ViewStyle>;
  size?: 'small' | 'medium' | 'large';
}

export const AppTitle: React.FC<AppTitleProps> = ({ 
  containerStyle,
  size = 'large'
}) => {
  const getFontSize = () => {
    switch (size) {
      case 'small':
        return 24;
      case 'medium':
        return 30;
      case 'large':
        return 36;
      default:
        return 36;
    }
  };

  return (
    <View style={[styles.titleContainer, containerStyle]}>
      <Text style={[styles.titleText, { fontSize: getFontSize() }]}>PING</Text>
      <Text style={[styles.titleText, { fontSize: getFontSize() }]}>PUSH</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  titleText: {
    fontFamily: 'PressStart2P_400Regular',
    color: '#FFFFFF',
    textShadowColor: 'rgba(255, 255, 255, 0.4)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
    marginVertical: 5,
  },
});
