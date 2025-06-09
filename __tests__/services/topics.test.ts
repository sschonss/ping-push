import { TopicsService } from '../../src/services/topics';
import * as firestore from 'firebase/firestore';
import { Topic } from '../../src/types';

// Mock para o Firestore
jest.mock('firebase/firestore', () => {
  const originalModule = jest.requireActual('firebase/firestore');
  return {
    ...originalModule,
    collection: jest.fn(),
    addDoc: jest.fn(),
    getDocs: jest.fn(),
    deleteDoc: jest.fn(),
    doc: jest.fn(),
    query: jest.fn(),
    orderBy: jest.fn(),
    onSnapshot: jest.fn(),
    serverTimestamp: jest.fn(),
    enableNetwork: jest.fn(),
    disableNetwork: jest.fn(),
    getDocsFromCache: jest.fn(),
    writeBatch: jest.fn(),
    enableIndexedDbPersistence: jest.fn().mockResolvedValue(undefined),
  };
});

jest.mock('../../src/config/firebase', () => ({
  db: {}
}));

describe('TopicsService', () => {
  const mockTopic: Topic = {
    id: 'topic-1',
    name: 'Test Topic',
    createdBy: 'user-1',
    createdAt: new Date()
  };

  const mockTopics = [
    mockTopic,
    {
      id: 'topic-2',
      name: 'Another Topic',
      createdBy: 'user-2',
      createdAt: new Date(Date.now() - 1000)
    }
  ];

  const mockQuerySnapshot = {
    docs: mockTopics.map(topic => ({
      id: topic.id,
      data: () => ({ name: topic.name, createdBy: topic.createdBy, createdAt: topic.createdAt })
    })),
    metadata: { fromCache: false }
  };

  const mockBatch = {
    delete: jest.fn(),
    commit: jest.fn().mockResolvedValue(undefined)
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (firestore.writeBatch as jest.Mock).mockReturnValue(mockBatch);
    (firestore.collection as jest.Mock).mockReturnValue('mock-collection');
    (firestore.query as jest.Mock).mockReturnValue('mock-query');
    (firestore.orderBy as jest.Mock).mockReturnValue('mock-orderBy');
    (firestore.serverTimestamp as jest.Mock).mockReturnValue({ _seconds: Date.now() / 1000 });
    (firestore.doc as jest.Mock).mockReturnValue('mock-doc-ref');
  });

  describe('enableOfflineMode', () => {
    it('deve desativar a rede', async () => {
      await TopicsService.enableOfflineMode();
      expect(firestore.disableNetwork).toHaveBeenCalled();
    });
  });

  describe('enableOnlineMode', () => {
    it('deve ativar a rede', async () => {
      await TopicsService.enableOnlineMode();
      expect(firestore.enableNetwork).toHaveBeenCalled();
    });
  });

  describe('subscribeToTopics', () => {
    it('deve configurar um listener para tópicos', () => {
      const mockUnsubscribe = jest.fn();
      (firestore.onSnapshot as jest.Mock).mockImplementation((_, __, callback) => {
        callback(mockQuerySnapshot);
        return mockUnsubscribe;
      });

      const onUpdateMock = jest.fn();
      const unsubscribe = TopicsService.subscribeToTopics(onUpdateMock);

      expect(firestore.collection).toHaveBeenCalled();
      expect(firestore.query).toHaveBeenCalled();
      expect(firestore.orderBy).toHaveBeenCalled();
      expect(firestore.onSnapshot).toHaveBeenCalled();
      expect(onUpdateMock).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ id: 'topic-1' }),
          expect.objectContaining({ id: 'topic-2' })
        ]),
        false
      );
      expect(unsubscribe).toBe(mockUnsubscribe);
    });

    it('deve usar o cache quando disponível e válido', () => {
      // Primeiro chamada para popular o cache
      const mockUnsubscribe = jest.fn();
      (firestore.onSnapshot as jest.Mock).mockImplementation((_, __, callback) => {
        callback(mockQuerySnapshot);
        return mockUnsubscribe;
      });

      const onUpdateMock = jest.fn();
      TopicsService.subscribeToTopics(onUpdateMock);
      
      // Segunda chamada com dados do cache (simulando fromCache=true)
      const cacheQuerySnapshot = { 
        ...mockQuerySnapshot,
        metadata: { fromCache: true }
      };
      
      (firestore.onSnapshot as jest.Mock).mockImplementation((_, __, callback) => {
        callback(cacheQuerySnapshot);
        return mockUnsubscribe;
      });
      
      const onUpdateMock2 = jest.fn();
      TopicsService.subscribeToTopics(onUpdateMock2);
      
      expect(onUpdateMock2).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ id: 'topic-1' }),
          expect.objectContaining({ id: 'topic-2' })
        ]),
        true
      );
    });
  });

  describe('addTopic', () => {
    it('deve adicionar um tópico com sucesso', async () => {
      const newTopicData = {
        name: 'New Topic',
        createdBy: 'user-1'
      };

      const docRef = { id: 'new-topic-id' };
      (firestore.addDoc as jest.Mock).mockResolvedValueOnce(docRef);

      const result = await TopicsService.addTopic(newTopicData);

      expect(firestore.collection).toHaveBeenCalled();
      expect(firestore.addDoc).toHaveBeenCalledWith(
        'mock-collection',
        expect.objectContaining({
          name: 'New Topic',
          createdBy: 'user-1'
        })
      );
      expect(result).toBe('new-topic-id');
    });

    it('deve lançar um erro se a adição falhar', async () => {
      const error = new Error('Firestore error');
      (firestore.addDoc as jest.Mock).mockRejectedValueOnce(error);

      await expect(TopicsService.addTopic({
        name: 'Failed Topic',
        createdBy: 'user-1'
      })).rejects.toThrow('Firestore error');
    });
  });

  describe('getTopics', () => {
    it('deve retornar tópicos do Firestore', async () => {
      (firestore.getDocs as jest.Mock).mockResolvedValueOnce(mockQuerySnapshot);

      const result = await TopicsService.getTopics();

      expect(firestore.collection).toHaveBeenCalled();
      expect(firestore.query).toHaveBeenCalled();
      expect(firestore.orderBy).toHaveBeenCalled();
      expect(firestore.getDocs).toHaveBeenCalled();
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('topic-1');
      expect(result[1].id).toBe('topic-2');
    });

    it('deve usar o cache se estiver válido', async () => {
      // Primeira chamada para popular o cache
      (firestore.getDocs as jest.Mock).mockResolvedValueOnce(mockQuerySnapshot);
      await TopicsService.getTopics();
      
      // Segunda chamada deve usar o cache em vez de chamar getDocs novamente
      const result = await TopicsService.getTopics();
      
      expect(result).toHaveLength(2);
      expect(firestore.getDocs).toHaveBeenCalledTimes(1); // Não deve ser chamado novamente
    });

    it('deve lançar um erro se a busca falhar', async () => {
      const error = new Error('Firestore error');
      (firestore.getDocs as jest.Mock).mockRejectedValueOnce(error);

      await expect(TopicsService.getTopics()).rejects.toThrow('Firestore error');
    });
  });

  describe('deleteTopics', () => {
    it('deve excluir múltiplos tópicos com sucesso', async () => {
      await TopicsService.deleteTopics(['topic-1', 'topic-2']);

      expect(firestore.doc).toHaveBeenCalledTimes(2);
      expect(mockBatch.delete).toHaveBeenCalledTimes(2);
      expect(mockBatch.commit).toHaveBeenCalledTimes(1);
    });

    it('deve lançar um erro se a exclusão falhar', async () => {
      const error = new Error('Batch deletion error');
      mockBatch.commit.mockRejectedValueOnce(error);

      await expect(TopicsService.deleteTopics(['topic-1'])).rejects.toThrow('Batch deletion error');
    });
  });

  describe('deleteTopic', () => {
    it('deve chamar deleteTopics com um único ID', async () => {
      const spy = jest.spyOn(TopicsService, 'deleteTopics').mockResolvedValueOnce();
      
      await TopicsService.deleteTopic('topic-1');
      
      expect(spy).toHaveBeenCalledWith(['topic-1']);
    });
  });
});
