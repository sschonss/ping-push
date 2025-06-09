import { AuthService } from '../../src/services/auth';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  User
} from 'firebase/auth';

// Mock Firebase Auth
jest.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  getAuth: jest.fn()
}));

jest.mock('../../src/config/firebase', () => ({
  auth: {
    currentUser: null
  }
}));

describe('AuthService', () => {
  const mockUser = { uid: '123', email: 'test@example.com' } as unknown as User;
  const mockUserCredential = { user: mockUser };
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  describe('signUp', () => {
    it('deve criar um usuário com sucesso', async () => {
      (createUserWithEmailAndPassword as jest.Mock).mockResolvedValueOnce(mockUserCredential);
      
      const result = await AuthService.signUp('test@example.com', 'password123');
      
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(),
        'test@example.com',
        'password123'
      );
      expect(result).toEqual(mockUser);
    });
    
    it('deve lançar um erro se a criação falhar', async () => {
      const error = new Error('Auth failed');
      (createUserWithEmailAndPassword as jest.Mock).mockRejectedValueOnce({ message: 'Auth failed' });
      
      await expect(AuthService.signUp('test@example.com', 'password123')).rejects.toThrow('Auth failed');
    });
  });
  
  describe('signIn', () => {
    it('deve autenticar um usuário com sucesso', async () => {
      (signInWithEmailAndPassword as jest.Mock).mockResolvedValueOnce(mockUserCredential);
      
      const result = await AuthService.signIn('test@example.com', 'password123');
      
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(),
        'test@example.com',
        'password123'
      );
      expect(result).toEqual(mockUser);
    });
    
    it('deve lançar um erro se a autenticação falhar', async () => {
      (signInWithEmailAndPassword as jest.Mock).mockRejectedValueOnce({ message: 'Invalid credentials' });
      
      await expect(AuthService.signIn('test@example.com', 'wrong-password')).rejects.toThrow('Invalid credentials');
    });
  });
  
  describe('signOut', () => {
    it('deve desconectar o usuário com sucesso', async () => {
      (firebaseSignOut as jest.Mock).mockResolvedValueOnce(undefined);
      
      await AuthService.signOut();
      
      expect(firebaseSignOut).toHaveBeenCalled();
    });
    
    it('deve lançar um erro se a desconexão falhar', async () => {
      (firebaseSignOut as jest.Mock).mockRejectedValueOnce({ message: 'Sign out failed' });
      
      await expect(AuthService.signOut()).rejects.toThrow('Sign out failed');
    });
  });
  
  describe('getCurrentUser', () => {
    it('deve retornar null quando não há usuário autenticado', () => {
      const result = AuthService.getCurrentUser();
      expect(result).toBeNull();
    });
    
    it('deve retornar o usuário atual quando autenticado', () => {
      // Modificando o mock para simular um usuário autenticado
      jest.requireMock('../../src/config/firebase').auth.currentUser = mockUser;
      
      const result = AuthService.getCurrentUser();
      expect(result).toEqual(mockUser);
      
      // Restaurando o mock para o estado original
      jest.requireMock('../../src/config/firebase').auth.currentUser = null;
    });
  });
});
