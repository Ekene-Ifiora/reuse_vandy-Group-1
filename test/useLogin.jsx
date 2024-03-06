// these tests do not work right now

// import { act } from 'react-dom/test-utils';
// import { vi } from 'vitest'
// import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
// import useLogin from '../src/hooks/useLogin';

// // Mocking the firebase functions
// vi.mock('react-firebase-hooks/auth', () => ({
//   useSignInWithEmailAndPassword: vi.fn(),
// }));

// vi.mock('../src/hooks/useShowToast', () => () => ({
//   default: vi.fn(),
// }));

// vi.mock('../src/firebase/firebase', () => ({
//   auth: vi.fn(),
//   firestore: {
//     doc: vi.fn(),
//   },
// }));

// vi.mock('../src/store/authStore', () => () => ({
//   loginUser: vi.fn(),
// }));

// describe('useLogin hook', () => {
//   it('should handle login successfully', async () => {
//     const mockedSignInWithEmailAndPassword = vi.fn();
//     useSignInWithEmailAndPassword.mockReturnValue([
//       mockedSignInWithEmailAndPassword,
//       undefined,
//       false,
//       undefined,
//     ]);

//     const mockedShowToast = vi.fn();
//     require('../src/useShowToast').default.mockReturnValue({ showToast: mockedShowToast });

//     const mockedLoginUser = vi.fn();
//     require('../src/store/authStore').default.mockReturnValue({ loginUser: mockedLoginUser });

//     const { login } = useLogin();

//     // Render your component that uses the useLogin hook

//     await act(async () => {
//       await login({ email: 'test@example.com', password: 'password' });
//     });

//     // Assertions
//     expect(mockedSignInWithEmailAndPassword).toHaveBeenCalledWith('test@example.com', 'password');
//     expect(mockedShowToast).not.toHaveBeenCalled(); // Assuming login is successful, no toast should be shown
//     expect(mockedLoginUser).toHaveBeenCalled(); // Assuming login is successful, the loginUser function should be called
//   });

//   it('should handle login failure', async () => {
//     const mockedSignInWithEmailAndPassword = vi.fn(() => {
//       throw new Error('Invalid credentials');
//     });
//     useSignInWithEmailAndPassword.mockReturnValue([
//       mockedSignInWithEmailAndPassword,
//       undefined,
//       false,
//       undefined,
//     ]);

//     const mockedShowToast = vi.fn();
//     require('../src/useShowToast').default.mockReturnValue({ showToast: mockedShowToast });

//     const { login } = useLogin();

//     // Render your component that uses the useLogin hook

//     await act(async () => {
//       await login({ email: 'test@example.com', password: 'wrongpassword' });
//     });

//     // Assertions
//     expect(mockedSignInWithEmailAndPassword).toHaveBeenCalledWith('test@example.com', 'wrongpassword');
//     expect(mockedShowToast).toHaveBeenCalledWith('Error', 'Invalid credentials', 'error');
//   });
// });