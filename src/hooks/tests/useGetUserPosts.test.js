import { renderHook, waitFor } from "@testing-library/react";
import useGetUserPosts from "../useGetUserPosts";

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

describe("useGetUserPosts", () => {
  it("should initialize with isLoading set to true", () => {
    const { result } = renderHook(() => useGetUserPosts());
    expect(result.current.isLoading).toBe(true);
  });

  it("should fetch user-specific posts successfully", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useGetUserPosts());
    const { isLoading, posts } = result.current;

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
      expect(posts).toBeDefined();
    });
  });

  it("should handle errors during user-specific posts fetch", async () => {
    const { result } = renderHook(() => useGetUserPosts());
    const { isLoading, showToast } = result.current;

    // Mock Firestore getDocs function to throw an error
    jest.spyOn(require("firebase/firestore"), "getDocs").mockRejectedValueOnce(new Error("Fetch error"));

    
    waitFor (() => {
      expect(isLoading).toBe(true);
      expect(showToast).toHaveBeenCalledWith("Error fetching user posts", "error");
    });
  });
});