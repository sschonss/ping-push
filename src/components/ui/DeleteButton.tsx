import React from 'react';
import { Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';

interface DeleteButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  style,
  textStyle,
}) => {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isDisabled && styles.buttonDisabled,
        style,
      ]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
    >
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
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
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 16,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
});
