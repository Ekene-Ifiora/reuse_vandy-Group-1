import { renderHook, waitFor } from "@testing-library/react";
import useGetSuggestedUsers from "../useGetSuggestedUsers";

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

describe("useGetSuggestedUsers", () => {
  it("should initialize with isLoading set to true", () => {
    const { result } = renderHook(() => useGetSuggestedUsers());
    expect(result.current.isLoading).toBe(true);
  });

  it("should fetch suggested users successfully", async () => {
    const { result } = renderHook(() => useGetSuggestedUsers());
    const { isLoading, suggestedUsers } = result.current;

    // Mock Firestore query and snapshot data
    const mockQuerySnapshot = {
      forEach: jest.fn(),
    };

    // Mock each document in the snapshot
    const mockDoc = { id: "userId", data: jest.fn(() => ({ createdAt: Date.now() })) };
    mockQuerySnapshot.forEach.mockImplementation((callback) => {
      callback(mockDoc);
    });

    // Mock Firestore getDocs function to return the mock query snapshot
    jest.spyOn(require("firebase/firestore"), "getDocs").mockResolvedValueOnce(mockQuerySnapshot);

    waitFor(() => {
      expect(isLoading).toBe(false);
      expect(suggestedUsers).toBeDefined();
    });

  });

  it("should handle errors during suggested users fetch", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useGetSuggestedUsers());
    const { isLoading, showToast } = result.current;

    // Mock Firestore getDocs function to throw an error
    jest.spyOn(require("firebase/firestore"), "getDocs").mockRejectedValueOnce(new Error("Fetch error"));

    
    waitFor (() => {
      expect(isLoading).toBe(true);
      expect(showToast).toHaveBeenCalledWith("Error getting suggested users", "error");
    });
  });
});
