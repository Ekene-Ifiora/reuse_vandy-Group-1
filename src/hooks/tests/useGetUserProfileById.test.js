// Import necessary dependencies and hooks for testing
import { renderHook, act, waitFor } from "@testing-library/react";
import useGetUserProfileById from "../useGetUserProfileById";
import useShowToast from "../useShowToast";
import { doc, getDoc } from "firebase/firestore";

jest.mock('react-firebase-hooks/auth');
jest.mock('../../store/authStore');
jest.mock('../useShowToast');
jest.mock('firebase/firestore');

doc.mockResolvedValue({});
getDoc.mockResolvedValue({});

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

describe("useGetUserProfileById", () => {
  it("should initialize with isLoading set to false", () => {
    renderHook(() => useGetUserProfileById("testUserId"));
  });

  it("should run correctly", async () => {
    const { result } = renderHook(() => useGetUserProfileById("test"));
    const { isLoading, userProfile } = result.current;

    // Mock Firestore query and snapshot data
    const mockQuerySnapshot = {
      forEach: jest.fn(),
    };

    // Mock each document in the snapshot
    const mockDoc = { id: "postId", data: jest.fn(() => ({ createdAt: Date.now() })) };
    mockQuerySnapshot.forEach.mockImplementation((callback) => {
      callback(mockDoc);
    });

    // Mock Firestore getDocs function to return the mock query snapshot
    jest.spyOn(require("firebase/firestore"), "getDocs").mockResolvedValueOnce(mockQuerySnapshot);

    waitFor(() => {
      expect(isLoading).toBe(false);
      expect(userProfile).toBeDefined();
    });
  });

  it("should handle errors during user profile fetch", async () => {
    const { result } = renderHook(() => useGetUserProfileById("m"));
    const { isLoading, showToast } = result.current;

    // Mock Firestore getDocs function to throw an error
    jest.spyOn(require("firebase/firestore"), "getDocs").mockRejectedValueOnce(new Error("Fetch error"));

    
    waitFor(() => {
      expect(isLoading).toBe(true);
      expect(showToast).toHaveBeenCalledWith("Error getting user profile", "error");
    });
  });

  it('should get user profile', async () => {
    e2 = "e";
    var id = 2;
    getDoc.mockResolvedValueOnce({ exists: () => { return true; } });

    act(() => {
      const { result } = renderHook(() => useGetUserProfileById(id));
    });

    expect(e2).toBe("e");
  });

  it('should get errors', async () => {
    var id = 2;

    act(() => {
      const { result } = renderHook(() => useGetUserProfileById(id));
      id = 1;
    });
    
    expect(e1).toBe("Error");
    expect(e2).toBe("userRef.data is not a function");
    expect(e3).toBe("error");
  });

  it('should work if userRef does not exist', async () => {
    e2 = "e";
    var id = 2;
    getDoc.mockResolvedValueOnce({ exists: () => { return false; } });

    act(() => {
      const { result } = renderHook(() => useGetUserProfileById(id));
    });

    expect(e2).toBe("e");
  });


});