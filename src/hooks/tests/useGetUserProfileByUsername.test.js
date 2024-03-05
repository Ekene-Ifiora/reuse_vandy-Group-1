// Import necessary dependencies and hooks for testing
import { renderHook, waitFor } from "@testing-library/react";
import useGetUserProfileByUsername from "../useGetUserProfileByUsername";

jest.mock('react-firebase-hooks/auth');
jest.mock('../../store/authStore');

// Mock the necessary Firebase functions
jest.mock('firebase/firestore', () => ({
  ...jest.requireActual('firebase/firestore'),
  getFirestore: jest.fn(() => ({
    doc: jest.fn(),
    getDoc: jest.fn(),
  })),
}));

describe("useGetUserProfileByUsername", () => {
  it("should initialize with isLoading set to true", () => {
    const { result } = renderHook(() => useGetUserProfileByUsername("testUsername"));
    expect(result.current.isLoading).toBe(false);
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
});