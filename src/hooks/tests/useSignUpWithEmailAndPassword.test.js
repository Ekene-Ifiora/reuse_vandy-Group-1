import { renderHook, act } from "@testing-library/react";
import useSignUpWithEmailAndPassword from "../useSignUpWithEmailAndPassword";
import {
  useCreateUserWithEmailAndPassword as firebaseUseCreateUserWithEmailAndPassword,
  AuthError as FirebaseAuthError,
} from "react-firebase-hooks/auth";
import useShowToast from "../useShowToast";
import useAuthStore from "../../store/authStore";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { sendEmailVerification } from "firebase/auth";

jest.mock('react-firebase-hooks/auth');
jest.mock('../useShowToast');
jest.mock('../../store/authStore');
jest.mock("firebase/firestore");
jest.mock('firebase/auth');

collection.mockResolvedValue({});
doc.mockResolvedValue({});
getDocs.mockResolvedValue({});
query.mockResolvedValue({});
setDoc.mockResolvedValue({});
where.mockResolvedValue({});
sendEmailVerification.mockResolvedValue({});

useAuthStore.mockReturnValue((_) => { return true; });

var wantTrue = true;
var createUserWithEmailAndPassword = () => {
  return wantTrue;
};

var loading = false;
var error = {message: 'here'};

firebaseUseCreateUserWithEmailAndPassword.mockReturnValue([createUserWithEmailAndPassword, , loading, error]);

var e1;
var e2;
var e3;
useShowToast.mockImplementation(() => {
  const showToast = (error1, error2, error3) => {
    e1 = error1; 
    e2 = error2; 
    e3 = error3;
  }
  return showToast;
});

describe("useSignUpWithEmailAndPassword", () => {

  it('should not accept if invalid inputs', async () => {
    const inputs = {x: 's'};
    const { result } = renderHook(() => useSignUpWithEmailAndPassword());
    const { signup } = result.current;

    await act(async () => {
      await signup(inputs);
    });

    expect(e1).toBe("Error");
    expect(e2).toBe("Please fill all the fields")
    expect(e3).toBe("error");
  });

  it('should fail if user already exists', async () => {
    const inputs = {
      email: '@',
      password: 'p',
      username: 'u',
      fullName: 'M'
    };

    const { result } = renderHook(() => useSignUpWithEmailAndPassword());
    const { signup } = result.current;

    getDocs.mockResolvedValueOnce({empty: false});

    await act(async () => {
      await signup(inputs);
    });

    expect(e1).toBe("Error");
    expect(e2).toBe("Username already exists");
    expect(e3).toBe("error");
  });

  it('should fail if new user not created', async () => {
    const inputs = {
      email: '@',
      password: 'p',
      username: 'u',
      fullName: 'M'
    };

    const { result } = renderHook(() => useSignUpWithEmailAndPassword());
    const { signup } = result.current;

    getDocs.mockResolvedValueOnce({empty: true});
    wantTrue = false;

    await act(async () => {
      await signup(inputs);
    });
    wantTrue = true;

    expect(e1).toBe("Error");
    expect(e2).toBe("here");
    expect(e3).toBe("error");
  });

  it('should fail if new user not created', async () => {
    const inputs = {
      email: '@',
      password: 'p',
      username: 'u',
      fullName: 'M'
    };

    const { result } = renderHook(() => useSignUpWithEmailAndPassword());
    const { signup } = result.current;

    getDocs.mockResolvedValueOnce({empty: true});
    wantTrue = false;

    await act(async () => {
      await signup(inputs);
    });
    wantTrue = true;

    expect(e1).toBe("Error");
    expect(e2).toBe("here");
    expect(e3).toBe("error");
  });

  it('should succeed', async () => {
    e1 = 'e';
    const inputs = {
      email: '@',
      password: 'p',
      username: 'u',
      fullName: 'M'
    };

    createUserWithEmailAndPassword = (_) => {
      return {user: {uid: 5}};
    };

    firebaseUseCreateUserWithEmailAndPassword.mockReturnValueOnce([createUserWithEmailAndPassword, , loading, error]);

    const { result } = renderHook(() => useSignUpWithEmailAndPassword());
    const { signup } = result.current;

    getDocs.mockResolvedValueOnce({empty: true});

    await act(async () => {
      await signup(inputs);
    });

    expect(e1).toBe("e");
  });

  it('should fail if error', async () => {
    const inputs = {
      email: '@',
      password: 'p',
      username: 'u',
      fullName: 'M'
    };

    const { result } = renderHook(() => useSignUpWithEmailAndPassword());
    const { signup } = result.current;

    getDocs.mockResolvedValueOnce({empty: true});
    createUserWithEmailAndPassword = (_) => {
      return {user: 'e'};
    };

    await act(async () => {
      await signup(inputs);
    });

    expect(e1).toBe("Error");
    expect(e2).toBe("Cannot read properties of undefined (reading 'uid')");
    expect(e3).toBe("error");
  });
});