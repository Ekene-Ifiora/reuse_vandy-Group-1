import { renderHook, act } from '@testing-library/react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import useAuthStore from '../../store/authStore';
import useShowToast from '../useShowToast';
import useLogin from '../useLogin';
import { doc, getDoc } from "firebase/firestore";

jest.mock('react-firebase-hooks/auth');
jest.mock('../useShowToast');
jest.mock('../../store/authStore');
jest.mock('firebase/firestore');

doc.mockResolvedValue({});
getDoc.mockResolvedValue({data: () => {
  return {
    uid: 1,
    email: "@",
    username: "u",
    fullName: "F",
    bio: "",
    profilePicURL: "",
    followers: [],
    following: [],
    posts: [],
    chats: [],
    friends: [],
    createdAt: 1,
    cart:[],
  };
}});
useAuthStore.mockReturnValue((_) => { return true; });

var wantTrue = false;
var signInWithEmailAndPassword = () => {
  return wantTrue;
};

var loading = false;
var error = {message: "here"};

useSignInWithEmailAndPassword.mockReturnValue([signInWithEmailAndPassword, , loading, error]);

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

describe('useLogin', () => {
  it('should error if bad inputs', async () => {
    const inputs = {x: 's'};
    const { result } = renderHook(() => useLogin());
    const { login } = result.current;

    await act(async () => {
      await login(inputs);
    });

    expect(e1).toBe("Error");
    expect(e2).toBe("Please fill all the fields")
    expect(e3).toBe("error");
  });

  it('should work if user not credentialed', async () => {
    e1 = "e";
    const inputs = {
      email: "@",
      password: "p"
    };
    const { result } = renderHook(() => useLogin());
    const { login } = result.current;

    await act(async () => {
      await login(inputs);
    });

    expect(e1).toBe("e");
  });

  it('should work', async () => {
    e1 = "4";
    const inputs = {
      email: "@",
      password: "p"
    };
    const { result } = renderHook(() => useLogin());
    const { login } = result.current;

    wantTrue = {user: {uid: 5}};

    await act(async () => {
      await login(inputs);
    });

    expect(e1).toBe("4");
  });

  it('should handle errors', async () => {
    const inputs = {
      email: "@",
      password: "p"
    };
    const { result } = renderHook(() => useLogin());
    const { login } = result.current;

    wantTrue = true;
    getDoc.mockResolvedValue({x: () => {return true;}});

    await act(async () => {
      await login(inputs);
    });

    expect(e1).toBe("Error");
    expect(e2).toBe("Cannot read properties of undefined (reading 'uid')");
    expect(e3).toBe("error");
  });
});

