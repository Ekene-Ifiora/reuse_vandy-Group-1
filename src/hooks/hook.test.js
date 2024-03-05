import { renderHook, act } from '@testing-library/react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import useAuthStore from '../store/authStore';
import useShowToast from './useShowToast';
import useLogin from './useLogin';

// Mock the useSignInWithEmailAndPassword and useShowToast hooks
jest.mock('react-firebase-hooks/auth');
jest.mock('./useShowToast');
jest.mock('../store/authStore');

// Mock the necessary Firebase functions
jest.mock('firebase/firestore', () => ({
  ...jest.requireActual('firebase/firestore'),  // Use the actual implementation for other functions
  getFirestore: jest.fn(() => ({
    doc: jest.fn(),
    getDoc: jest.fn(),
  })),
}));

// Import and setup jest-localstorage-mock


describe('useLogin', () => {
  // Mock the dependencies for the hook
  const mockSignInWithEmailAndPassword = jest.fn();
  const mockUseAuthStore = jest.fn();
  const mockShowToast = jest.fn();

  // Set up initial state for the mocked useAuthStore
  mockUseAuthStore.mockReturnValue({ login: jest.fn() });

  // Set up the mocked hook functions
  useSignInWithEmailAndPassword.mockReturnValue([mockSignInWithEmailAndPassword, , false, null]);
  useAuthStore.mockImplementation(mockUseAuthStore);
  useShowToast.mockReturnValue(mockShowToast);

  // Clean up mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show an error toast if email or password is not provided', async () => {
    const { result } = renderHook(() => useLogin());

    await act(async () => {
      await result.current.login({ email: '', password: 'password' });
    });

    expect(mockShowToast).toHaveBeenCalledWith('Error', 'Please fill all the fields', 'error');
  });

  it('should handle successful login', async () => {
    const userCred = { user: { uid: 'user123' } };
    const docSnap = { data: jest.fn() };

    mockSignInWithEmailAndPassword.mockResolvedValue(userCred);
    doc.mockReturnValue('userDocRef');
    getDoc.mockResolvedValue(docSnap);

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      await result.current.login({ email: 'test@example.com', password: 'password' });
    });

    expect(doc).toHaveBeenCalledWith(firestore, 'users', 'user123');
    expect(getDoc).toHaveBeenCalledWith('userDocRef');
    expect(localStorage.setItem).toHaveBeenCalledWith('user-info', JSON.stringify(docSnap.data()));
    expect(mockUseAuthStore).toHaveBeenCalledWith(docSnap.data());
    expect(console.log).toHaveBeenCalledWith('test@example.com');
  });

  it('should handle login failure and show an error toast', async () => {
    const error = { message: 'Authentication failed' };

    mockSignInWithEmailAndPassword.mockRejectedValue(error);

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      await result.current.login({ email: 'test@example.com', password: 'password' });
    });

    expect(mockShowToast).toHaveBeenCalledWith('Error', error.message, 'error');
    expect(console.log).toHaveBeenCalledWith('test@example.com');
  });
});

// Clean up the global mock after all tests
afterAll(() => {
  jest.restoreAllMocks();  // This is specific to jest-localstorage-mock
});