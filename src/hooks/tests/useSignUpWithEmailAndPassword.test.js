import { renderHook, act } from "@testing-library/react";
import useSignUpWithEmailAndPassword from "../useSignUpWithEmailAndPassword";
import {
  useCreateUserWithEmailAndPassword as firebaseUseCreateUserWithEmailAndPassword,
  AuthError as FirebaseAuthError,
} from "react-firebase-hooks/auth";
import useShowToast from "../useShowToast";

jest.mock('react-firebase-hooks/auth');
jest.mock('../useShowToast');
jest.mock('../../store/authStore');

// Mock the necessary Firebase functions
jest.mock('firebase/firestore', () => ({
  ...jest.requireActual('firebase/firestore'),
  getFirestore: jest.fn(() => ({
    doc: jest.fn(),
    getDoc: jest.fn(),
  })),
}));

jest.mock("../../store/authStore", () => ({
  __esModule: true,
  default: {
    login: jest.fn(),
  },
}));

describe("useSignUpWithEmailAndPassword", () => {
  const mockInputs = {
    email: "test@example.com",
    password: "testpassword",
    username: "testuser",
    fullName: "Test User",
  };

  // const mockUser = {
  //   uid: "mockuid",
  //   email: mockInputs.email,
  //   username: mockInputs.username,
  //   fullName: mockInputs.fullName,
  // };

  it("should show an error toast when signup fails", async () => {
    const errorMock = FirebaseAuthError;
    const createUserWithEmailAndPasswordMock = jest.fn(() => ({
      user: null,
      error: errorMock,
    }));
    firebaseUseCreateUserWithEmailAndPassword.mockReturnValue([
      createUserWithEmailAndPasswordMock,
      null,
      false,
      errorMock,
    ]);

    const showToastMock = jest.fn();
    useShowToast.mockImplementation(showToastMock);

    const { result } = renderHook(() => useSignUpWithEmailAndPassword);

    await act(async () => {
      if (result.current.signup) { // Check if signup function is defined
        await result.current.signup(mockInputs);
      }
    });
  });
});