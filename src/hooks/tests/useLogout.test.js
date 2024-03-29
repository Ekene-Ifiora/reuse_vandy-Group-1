// Import necessary dependencies and hooks for testing
import { renderHook, act, waitFor } from "@testing-library/react";
import useLogout from "../useLogout";
import useShowToast from "../useShowToast";
import { useSignOut } from "react-firebase-hooks/auth";
import useAuthStore from "../../store/authStore";

jest.mock('../useShowToast');
jest.mock('../../store/authStore');
jest.mock('firebase/firestore');
jest.mock('../useShowToast');
jest.mock('react-firebase-hooks/auth');
jest.mock('../../store/authStore');

useAuthStore.mockReturnValue((_) => { return true; });

var wantTrue = false;
var signOut = () => {
  return wantTrue;
};

var isLogginOut = false;
var error = {
  message: "here"
};
useSignOut.mockReturnValue([signOut, isLogginOut, error]);

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

describe("useLogout", () => {
  it("should initialize with correct initial state", () => {
    const { result } = renderHook(() => useLogout());
    const { handleLogout, isLoggingOut, error } = result.current;

    expect(typeof handleLogout).toBe("function");
    expect(isLoggingOut).toBe(false);
    expect(error.message).toBe("here");
  });

  it('should handle errors', async () => {
    useAuthStore.mockReturnValueOnce(true);
    const { result } = renderHook(() => useLogout());
    const { handleLogout, isLoggingOut, error } = result.current;

    await act(async () => {
      await handleLogout();
    });

    waitFor(() => {
      expect(isLoggingOut).toBe(false);
    });

    expect(e1).toBe("Error");
    expect(e2).toBe("logoutUser is not a function");
    expect(e3).toBe("error");
    expect(error.message).toBe("here");
  });

  it('should log out correctly', async () => {
    e1 = "k";
    const { result } = renderHook(() => useLogout());
    const { handleLogout, isLoggingOut, error } = result.current;

    await act(async () => {
      await handleLogout();
    });

    waitFor(() => {
      expect(isLoggingOut).toBe(false);
    });

    expect(e1).toBe("k");
    expect(error.message).toBe("here");
  });
});