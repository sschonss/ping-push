import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Image, Text } from '../StyledComponents';

type AvatarProps = {
  source?: { uri: string };
  size?: number;
  name?: string;
  backgroundColor?: string;
  borderColor?: string;
};

export const Avatar = ({
  source,
  size = 50,
  name = '',
  backgroundColor = '#333',
  borderColor = '#FFF'
}: AvatarProps) => {
  const initials = name
    .split(' ')
    .map(part => part.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');

  const avatarStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor,
    borderWidth: 2,
    borderColor
  };

  const textSize = size * 0.4;

  return (
    <View style={[styles.container, avatarStyle]}>
      {source ? (
        <Image 
          source={source} 
          style={[styles.image, { borderRadius: size / 2 }]} 
        />
      ) : (
        <Text style={[styles.initials, { fontSize: textSize }]}>
          {initials}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  initials: {
    color: '#FFFFFF',
    fontFamily: 'PressStart2P_400Regular'
  }
});
