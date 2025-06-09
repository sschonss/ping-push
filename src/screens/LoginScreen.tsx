import React, { useState } from 'react';
import { AuthService } from '../services/auth';
import { Alert, StyleSheet, Dimensions } from 'react-native';
import { View, Text } from '../components/StyledComponents';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { router } from 'expo-router';
import { Button, Input } from '../components/ui';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text 
          style={[styles.titleText, {
            textShadowColor: 'rgba(255, 255, 255, 0.4)',
            textShadowOffset: { width: 2, height: 2 },
            textShadowRadius: 1,
          }]}>PING</Text>
        <Text 
          style={[styles.titleText, {
            textShadowColor: 'rgba(255, 255, 255, 0.4)',
            textShadowOffset: { width: 2, height: 2 },
            textShadowRadius: 1,
          }]}>PUSH</Text>
      </View>

      <View style={styles.formContainer}>
        <Input
          label="email"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter email"
          keyboardType="email-address"
          autoComplete="email"
        />

        <Input
          label="password"
          value={password}
          onChangeText={setPassword}
          placeholder="Enter password"
          secureTextEntry
        />

        <Button
          title="LOGIN"
          variant="primary"
          size="medium"
          fullWidth
          onPress={async () => {
            try {
              if (!email || !password) {
                Alert.alert('Error', 'Please fill in all fields');
                return;
              }
              await AuthService.signIn(email, password);
              router.replace('/home');
            } catch (error: any) {
              Alert.alert('Error', error.message || 'An error occurred during login');
            }
          }}
        />

        <Button
          title="create account"
          variant="outline"
          size="small"
          onPress={() => router.push('/create-account')}
          fullWidth
        />
      </View>
    </View>
  );
}

// Usando StyleSheet tradicional enquanto configuramos o NativeWind
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 80,
    marginBottom: 60,
  },
  titleText: {
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 36,
    color: '#FFFFFF',
    marginVertical: 5,
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },

});