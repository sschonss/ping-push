import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from '../StyledComponents';

type BadgeProps = {
  label?: string | number;
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'small' | 'medium' | 'large';
  dot?: boolean;
};

export const Badge = ({
  label,
  variant = 'primary',
  size = 'medium',
  dot = false
}: BadgeProps) => {
  const sizeValue = {
    small: 16,
    medium: 24,
    large: 32
  }[size];
  
  const textSize = {
    small: 8,
    medium: 10,
    large: 12
  }[size];

  return (
    <View style={[
      styles.badge,
      styles[variant],
      dot ? { width: sizeValue / 2, height: sizeValue / 2, borderRadius: sizeValue / 4 } : 
      { minWidth: sizeValue, height: sizeValue, borderRadius: sizeValue / 2 }
    ]}>
      {!dot && label !== undefined && (
        <Text style={[styles.label, { fontSize: textSize }]}>
          {label}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  label: {
    fontFamily: 'PressStart2P_400Regular',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  primary: {
    backgroundColor: '#FFFFFF',
  },
  success: {
    backgroundColor: '#4CAF50',
  },
  warning: {
    backgroundColor: '#FF9800',
  },
  error: {
    backgroundColor: '#FF0000',
  },
  info: {
    backgroundColor: '#2196F3',
  },
});
