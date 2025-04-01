import { Timestamp, FieldValue } from 'firebase/firestore';

export interface Topic {
  id: string;
  name: string;
  createdBy: string;
  createdAt: string | Date | Timestamp;
}

export interface NewTopic {
  name: string;
  createdBy: string;
  createdAt: FieldValue;
}

export interface User {
  id: string;
  username: string;
  password: string;
}
