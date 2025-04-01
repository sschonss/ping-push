import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, onSnapshot, Unsubscribe, serverTimestamp, enableNetwork, disableNetwork, getDocsFromCache, writeBatch, enableIndexedDbPersistence, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Topic, NewTopic } from '../types';

const COLLECTION_NAME = 'topics';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

class TopicsCache {
  private topics: Topic[] = [];
  private lastFetchTimestamp = 0;

  isValid(): boolean {
    return Date.now() - this.lastFetchTimestamp < CACHE_TTL;
  }

  update(topics: Topic[]): void {
    this.topics = topics;
    this.lastFetchTimestamp = Date.now();
  }

  get(): Topic[] {
    return this.topics;
  }

  addTopic(topic: Topic): void {
    this.topics = [topic, ...this.topics];
    this.lastFetchTimestamp = Date.now();
  }

  removeTopic(topicId: string): void {
    this.topics = this.topics.filter(t => t.id !== topicId);
    this.lastFetchTimestamp = Date.now();
  }

  removeTopics(topicIds: string[]): void {
    this.topics = this.topics.filter(t => !topicIds.includes(t.id));
    this.lastFetchTimestamp = Date.now();
  }
}

const cache = new TopicsCache();

// Initialize offline persistence
enableIndexedDbPersistence(db).catch((err: { code: string }) => {
  if (err.code === 'failed-precondition') {
    console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
  } else if (err.code === 'unimplemented') {
    console.warn('The current browser does not support persistence.');
  }
});

export const TopicsService = {
  async enableOfflineMode() {
    try {
      await disableNetwork(db);
      console.log('Offline mode enabled');
    } catch (error) {
      console.error('Error enabling offline mode:', error);
    }
  },

  async enableOnlineMode() {
    try {
      await enableNetwork(db);
      console.log('Online mode enabled');
    } catch (error) {
      console.error('Error enabling online mode:', error);
    }
  },

  subscribeToTopics(onUpdate: (topics: Topic[], fromCache: boolean) => void): Unsubscribe {
    const topicsQuery = query(
      collection(db, COLLECTION_NAME),
      orderBy('createdAt', 'desc')
    );

    return onSnapshot(topicsQuery, { includeMetadataChanges: true }, (snapshot) => {
      const fromCache = snapshot.metadata.fromCache;
      
      if (fromCache && cache.isValid()) {
        onUpdate(cache.get(), true);
        return;
      }

      const topics = snapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
        id: doc.id,
        ...doc.data()
      } as Topic));

      cache.update(topics);
      onUpdate(topics, fromCache);
    }, (error) => {
      console.error('Error subscribing to topics:', error);
    });
  },
  async addTopic(topic: Omit<NewTopic, 'createdAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...topic,
        createdAt: serverTimestamp(),
      });

      const newTopic: Topic = {
        id: docRef.id,
        ...topic,
        createdAt: new Date()
      };
      
      cache.addTopic(newTopic);
      return docRef.id;
    } catch (error) {
      console.error('Error adding topic:', error);
      throw error;
    }
  },

  async getTopics(): Promise<Topic[]> {
    if (cache.isValid()) {
      return cache.get();
    }

    try {
      const topicsQuery = query(
        collection(db, COLLECTION_NAME),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(topicsQuery);
      const topics = querySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
        id: doc.id,
        ...doc.data()
      } as Topic));

      cache.update(topics);
      return topics;
    } catch (error) {
      console.error('Error getting topics:', error);
      throw error;
    }
  },

  async deleteTopics(topicIds: string[]): Promise<void> {
    const batch = writeBatch(db);
    
    topicIds.forEach(topicId => {
      const topicRef = doc(db, COLLECTION_NAME, topicId);
      batch.delete(topicRef);
    });
    
    try {
      await batch.commit();
      cache.removeTopics(topicIds);
    } catch (error) {
      console.error('Error deleting topics:', error);
      throw error;
    }
  },

  async deleteTopic(topicId: string): Promise<void> {
    try {
      await this.deleteTopics([topicId]);
    } catch (error) {
      console.error('Error deleting topic:', error);
      throw error;
    }
  }
};
