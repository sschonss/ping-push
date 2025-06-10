import React, { ReactNode } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, StyleProp, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ScreenProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  scrollable?: boolean;
  padding?: boolean;
}

export const Screen: React.FC<ScreenProps> = ({
  children,
  style,
  scrollable = false,
  padding = true,
}) => {
  const insets = useSafeAreaInsets();
  
  const content = (
    <View 
      style={[
        styles.container,
        padding && styles.padding,
        { paddingTop: padding ? Math.max(insets.top, 20) : 0 },
        style
      ]}
    >
      {children}
    </View>
  );

  if (scrollable) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {content}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {content}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000000',
  },
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  padding: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollContent: {
    flexGrow: 1,
  },
});
