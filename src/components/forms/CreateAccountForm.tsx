import React, { useState } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, Alert } from 'react-native';
import { router } from 'expo-router';
import { AuthService } from '../../services/auth';
import { LabeledInput } from '../ui/LabeledInput';
import { Button } from '../ui/Button';

interface CreateAccountFormProps {
  containerStyle?: StyleProp<ViewStyle>;
  onAccountCreated?: () => void;
}

export const CreateAccountForm: React.FC<CreateAccountFormProps> = ({
  containerStyle,
  onAccountCreated
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const validateForm = () => {
    const newErrors: {
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateAccount = async () => {
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    try {
      await AuthService.signUp(email, password);
      Alert.alert('Success', 'Account created successfully');
      if (onAccountCreated) {
        onAccountCreated();
      } else {
        router.replace('/login');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'An error occurred during sign up');
    } finally {
      setLoading(false);
    }
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

      <LabeledInput
        label="confirm password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirm your password"
        secureTextEntry
        error={errors.confirmPassword}
      />

      <Button
        title="CREATE"
        onPress={handleCreateAccount}
        loading={loading}
        style={styles.createButton}
      />

      <Button
        title="back to login"
        onPress={() => router.back()}
        variant="outline"
        style={styles.backButton}
        textStyle={styles.backButtonText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  createButton: {
    marginTop: 10,
  },
  backButton: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  backButtonText: {
    fontSize: 12,
    textDecorationLine: 'underline',
  },
});
