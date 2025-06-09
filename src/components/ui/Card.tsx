import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, TouchableOpacity } from '../StyledComponents';

type CardProps = {
  title?: string;
  children: React.ReactNode;
  onPress?: () => void;
  variant?: 'default' | 'outlined' | 'elevated';
  footer?: React.ReactNode;
};

export const Card = ({
  title,
  children,
  onPress,
  variant = 'default',
  footer
}: CardProps) => {
  const CardComponent = onPress ? TouchableOpacity : View;
  
  return (
    <CardComponent 
      style={[styles.card, styles[variant]]} 
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      {title && (
        <View style={styles.headerContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
      )}
      
      <View style={styles.contentContainer}>
        {children}
      </View>

      {footer && (
        <View style={styles.footerContainer}>
          {footer}
        </View>
      )}
    </CardComponent>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    width: '100%',
  },
  default: {
    backgroundColor: '#1A1A1A',
  },
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#333333',
  },
  elevated: {
    backgroundColor: '#1A1A1A',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  headerContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  title: {
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 16,
    color: '#FFFFFF',
  },
  contentContainer: {
    padding: 16,
  },
  footerContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#333333',
  }
});
