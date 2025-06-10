import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  StyleProp, 
  ViewStyle, 
  TextStyle,
  ActivityIndicator 
} from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  disabled = false,
  loading = false,
  variant = 'primary',
}) => {
  const getButtonStyle = () => {
    switch (variant) {
      case 'primary':
        return styles.primaryButton;
      case 'secondary':
        return styles.secondaryButton;
      case 'outline':
        return styles.outlineButton;
      default:
        return styles.primaryButton;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'primary':
        return styles.primaryText;
      case 'secondary':
        return styles.secondaryText;
      case 'outline':
        return styles.outlineText;
      default:
        return styles.primaryText;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonStyle(),
        disabled ? styles.disabledButton : null,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? '#FFFFFF' : '#000000'} />
      ) : (
        <Text style={[styles.text, getTextStyle(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  primaryButton: {
    backgroundColor: '#FFFFFF',
  },
  secondaryButton: {
    backgroundColor: '#333333',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  disabledButton: {
    opacity: 0.5,
  },
  text: {
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 16,
  },
  primaryText: {
    color: '#000000',
  },
  secondaryText: {
    color: '#FFFFFF',
  },
  outlineText: {
    color: '#FFFFFF',
  },
});
