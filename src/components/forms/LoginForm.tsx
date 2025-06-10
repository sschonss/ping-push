import React, { useState } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, Alert } from 'react-native';
import { router } from 'expo-router';
import { AuthService } from '../../services/auth';
import { LabeledInput } from '../ui/LabeledInput';
import { Button } from '../ui/Button';

interface LoginFormProps {
  containerStyle?: StyleProp<ViewStyle>;
  onLoginSuccess?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  containerStyle,
  onLoginSuccess
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const validateForm = () => {
    const newErrors: {
      email?: string;
      password?: string;
    } = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    try {
      await AuthService.signIn(email, password);
      if (onLoginSuccess) {
        onLoginSuccess();
      } else {
        router.replace('/home');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  const navigateToCreateAccount = () => {
    router.push('/create-account');
  };

  return (
    <View style={[styles.formContainer, containerStyle]}>
      <LabeledInput
        label="email"
        value={email}
        onChangeText={setEmail}
        placeholder="Enter email"
        autoCapitalize="none"
        keyboardType="email-address"
        autoComplete="email"
        error={errors.email}
      />

      <LabeledInput
        label="password"
        value={password}
        onChangeText={setPassword}
        placeholder="Enter password"
        secureTextEntry
        error={errors.password}
      />

      <Button
        title="LOGIN"
        onPress={handleLogin}
        loading={loading}
        style={styles.loginButton}
      />

      <Button
        title="create account"
        onPress={navigateToCreateAccount}
        variant="outline"
        style={styles.createAccountButton}
        textStyle={styles.createAccountButtonText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  loginButton: {
    marginTop: 10,
  },
  createAccountButton: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  createAccountButtonText: {
    fontSize: 12,
    textDecorationLine: 'underline',
  },
});
