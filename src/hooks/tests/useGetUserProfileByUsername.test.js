// Import necessary dependencies and hooks for testing
import { renderHook, waitFor } from "@testing-library/react";
import useGetUserProfileByUsername from "../useGetUserProfileByUsername";
import useShowToast from "../useShowToast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import useUserProfileStore from "../../store/userProfileStore";

jest.mock('react-firebase-hooks/auth');
jest.mock('../../store/authStore');
jest.mock('../../store/authStore');
jest.mock('../useShowToast');
jest.mock('firebase/firestore');
jest.mock('../../store/userProfileStore');

query.mockResolvedValue({});
where.mockResolvedValue({});
collection.mockResolvedValue({});
getDocs.mockResolvedValue(1);

var userProfile = "n";
const setUserProfile = (n) => {
  userProfile = n;
};

useUserProfileStore.mockReturnValue({ userProfile, setUserProfile });

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

describe("useGetUserProfileByUsername", () => {
  it("should initialize with isLoading set to true", () => {
    const { result } = renderHook(() => useGetUserProfileByUsername("testUsername"));
  });

  it("should fetch user profile successfully when username exists", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useGetUserProfileByUsername("test"));
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
    const { result } = renderHook(() => useGetUserProfileByUsername("m"));
    const { isLoading, showToast } = result.current;

    // Mock Firestore getDocs function to throw an error
    jest.spyOn(require("firebase/firestore"), "getDocs").mockRejectedValueOnce(new Error("Fetch error"));

    
    waitFor (() => {
      expect(isLoading).toBe(true);
      expect(showToast).toHaveBeenCalledWith("Error getting user profile", "error");
    });
  });

  it('should work when needed', async () => {
    getDocs.mockResolvedValueOnce([{ data: () => {return "d";}}]);
    const { result } = renderHook(() => useGetUserProfileByUsername("m"));
    
    waitFor(() => {
      expect(userProfile).toBe("d");
    });
  });

  it('should throw errors', async () => {
    getDocs.mockResolvedValueOnce([1]);
    const { result } = renderHook(() => useGetUserProfileByUsername("m"));
    
    expect(e1).toBe("Error");
    expect(e2).toBe("Fetch error");
    expect(e3).toBe("error");
  });

  it('should work when query snapshot is empty', async () => {
    getDocs.mockResolvedValueOnce({empty: true});
    const { result } = renderHook(() => useGetUserProfileByUsername("m"));

    waitFor(() => {
      expect(userProfile).toBe(null);
    });
  });
});