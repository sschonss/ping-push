import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from '../../src/screens/HomeScreen';
import { TopicsService } from '../../src/services/topics';
import { router } from 'expo-router';
import { Topic } from '../../src/types';

// Mock das dependências
jest.mock('expo-router', () => ({
  router: {
    push: jest.fn()
  }
}));

jest.mock('../../src/services/topics', () => ({
  TopicsService: {
    subscribeToTopics: jest.fn()
  }
}));

jest.mock('@expo-google-fonts/press-start-2p', () => ({
  useFonts: () => [true],
  PressStart2P_400Regular: 'PressStart2P_400Regular'
}));

jest.mock('@expo/vector-icons', () => ({
  Feather: 'Feather'
}));

describe('HomeScreen', () => {
  const mockTopics: Topic[] = [
    { id: '1', name: 'Topic 1', description: 'Description 1', createdAt: new Date() },
    { id: '2', name: 'Topic 2', description: 'Description 2', createdAt: new Date() }
  ];
  
  let subscribeToTopicsMock: jest.Mock;
  let unsubscribeMock: jest.Mock;
  
  beforeEach(() => {
    jest.clearAllMocks();
    unsubscribeMock = jest.fn();
    subscribeToTopicsMock = TopicsService.subscribeToTopics as jest.Mock;
    // Mock para implementar a função de inscrição e retornar uma função de cancelamento
    subscribeToTopicsMock.mockImplementation((callback) => {
      // Simulando a chamada de callback assíncrono com os tópicos
      setTimeout(() => callback(mockTopics), 0);
      return unsubscribeMock;
    });
  });
  
  it('exibe indicador de carregamento inicialmente', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('Loading topics...')).toBeTruthy();
  });
  
  it('exibe lista de tópicos após carregamento', async () => {
    // Modificando a implementação para chamar o callback imediatamente
    subscribeToTopicsMock.mockImplementation((callback) => {
      callback(mockTopics);
      return unsubscribeMock;
    });
    
    const { findByText } = render(<HomeScreen />);
    
    const topic1 = await findByText('Topic 1');
    expect(topic1).toBeTruthy();
    
    const topic2 = await findByText('Topic 2');
    expect(topic2).toBeTruthy();
  });
  
  it('navega para a tela de informações do tópico ao clicar em um tópico', async () => {
    // Modificando a implementação para chamar o callback imediatamente
    subscribeToTopicsMock.mockImplementation((callback) => {
      callback(mockTopics);
      return unsubscribeMock;
    });
    
    const { findByText } = render(<HomeScreen />);
    
    const topic1 = await findByText('Topic 1');
    fireEvent.press(topic1);
    
    expect(router.push).toHaveBeenCalledWith('/info-topic?topicId=1');
  });
  
  it('navega para a tela de criação de tópico ao clicar no botão de criar', () => {
    const { getByText } = render(<HomeScreen />);
    
    const createButton = getByText('Create Topic');
    fireEvent.press(createButton);
    
    expect(router.push).toHaveBeenCalledWith('/create-topic');
  });
  
  it('exibe mensagem quando não há tópicos', async () => {
    // Modificando a implementação para retornar uma lista vazia
    subscribeToTopicsMock.mockImplementation((callback) => {
      callback([]);
      return unsubscribeMock;
    });
    
    const { findByText } = render(<HomeScreen />);
    
    const emptyMessage = await findByText('No topics yet');
    expect(emptyMessage).toBeTruthy();
  });
  
  it('cancela inscrição ao desmontar o componente', () => {
    const { unmount } = render(<HomeScreen />);
    unmount();
    expect(unsubscribeMock).toHaveBeenCalled();
  });
});
