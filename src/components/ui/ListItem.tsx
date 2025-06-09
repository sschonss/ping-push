import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, TouchableOpacity } from '../StyledComponents';

type ListItemProps = {
  title: string;
  subtitle?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onPress?: () => void;
  selected?: boolean;
};

export const ListItem = ({
  title,
  subtitle,
  leftIcon,
  rightIcon,
  onPress,
  selected = false
}: ListItemProps) => {
  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      style={[styles.container, selected && styles.selectedContainer]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
    </Container>
  );
};

export const Divider = () => (
  <View style={styles.divider} />
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#1A1A1A',
  },
  selectedContainer: {
    backgroundColor: '#333333',
  },
  leftIcon: {
    marginRight: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 10,
    color: '#999999',
  },
  rightIcon: {
    marginLeft: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#333333',
    width: '100%',
  }
});
