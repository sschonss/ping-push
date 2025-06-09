import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginScreen from '../../src/screens/LoginScreen';
import { AuthService } from '../../src/services/auth';
import { Alert } from 'react-native';
import { router } from 'expo-router';

// Mock das dependências
jest.mock('expo-router', () => ({
  router: {
    replace: jest.fn(),
    push: jest.fn()
  }
}));

jest.mock('../../src/services/auth', () => ({
  AuthService: {
    signIn: jest.fn()
  }
}));

jest.mock('@expo-google-fonts/press-start-2p', () => ({
  useFonts: () => [true],
  PressStart2P_400Regular: 'PressStart2P_400Regular'
}));

// Mock do Alert
jest.spyOn(Alert, 'alert').mockImplementation(() => {});

describe('LoginScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza corretamente', () => {
    const { getByText, getByPlaceholderText } = render(<LoginScreen />);
    
    expect(getByText('PING')).toBeTruthy();
    expect(getByText('PUSH')).toBeTruthy();
    expect(getByPlaceholderText('Enter email')).toBeTruthy();
    expect(getByPlaceholderText('Enter password')).toBeTruthy();
    expect(getByText('LOGIN')).toBeTruthy();
    expect(getByText('create account')).toBeTruthy();
  });

  it('atualiza os campos de email e senha corretamente', () => {
    const { getByPlaceholderText } = render(<LoginScreen />);
    
    const emailInput = getByPlaceholderText('Enter email');
    const passwordInput = getByPlaceholderText('Enter password');
    
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');
    
    expect(emailInput.props.value).toBe('test@example.com');
    expect(passwordInput.props.value).toBe('password123');
  });

  it('exibe alerta quando os campos estão vazios', async () => {
    const { getByText } = render(<LoginScreen />);
    
    fireEvent.press(getByText('LOGIN'));
    
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Error', 
        'Please fill in all fields'
      );
    });
  });

  it('faz login com sucesso e navega para a tela home', async () => {
    const mockSignIn = AuthService.signIn as jest.Mock;
    mockSignIn.mockResolvedValueOnce(undefined);
    
    const { getByText, getByPlaceholderText } = render(<LoginScreen />);
    
    fireEvent.changeText(getByPlaceholderText('Enter email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Enter password'), 'password123');
    
    fireEvent.press(getByText('LOGIN'));
    
    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith('test@example.com', 'password123');
      expect(router.replace).toHaveBeenCalledWith('/home');
    });
  });

  it('exibe erro quando falha no login', async () => {
    const mockSignIn = AuthService.signIn as jest.Mock;
    mockSignIn.mockRejectedValueOnce(new Error('Invalid credentials'));
    
    const { getByText, getByPlaceholderText } = render(<LoginScreen />);
    
    fireEvent.changeText(getByPlaceholderText('Enter email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Enter password'), 'password123');
    
    fireEvent.press(getByText('LOGIN'));
    
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Error', 
        'Invalid credentials'
      );
    });
  });

  it('navega para a tela de criar conta', () => {
    const { getByText } = render(<LoginScreen />);
    
    fireEvent.press(getByText('create account'));
    
    expect(router.push).toHaveBeenCalledWith('/create-account');
  });
});
