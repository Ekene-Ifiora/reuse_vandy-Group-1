// Import necessary dependencies and hooks for testing
import { renderHook, act } from "@testing-library/react";
import useGetUserProfileByUsername from "../useGetUserProfileByUsername"; // Make sure to update the import path

// Mock necessary dependencies
// jest.mock("../../store/userProfileStore", () => ({
//   __esModule: true,
//   default: jest.fn(() => ({
//     userProfile: null,
//     setUserProfile: jest.fn(),
//   })),
// }));
// jest.mock("../useShowToast", () => jest.fn());
// jest.mock("firebase/firestore", () => ({
//   collection: jest.fn(),
//   query: jest.fn(),
//   where: jest.fn(),
//   getDocs: jest.fn(),
// }));

jest.mock('react-firebase-hooks/auth');
// jest.mock('../useShowToast');
jest.mock('../../store/authStore');

// Mock the necessary Firebase functions
jest.mock('firebase/firestore', () => ({
  ...jest.requireActual('firebase/firestore'),  // Use the actual implementation for other functions
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

//   it("should fetch user profile successfully when username exists", async () => {
//     const { result, waitForNextUpdate } = renderHook(() => useGetUserProfileByUsername("testUsername"));
//     const { isLoading, userProfile } = result.current;

//     // Mock Firestore query and snapshot data
//     const mockQuerySnapshot = {
//       empty: false,
//       forEach: jest.fn(),
//     };
//     jest.spyOn(mockQuerySnapshot, "forEach").mockImplementation((callback) => {
//       // Mock each document in the snapshot
//       const mockDoc = { data: jest.fn(() => ({ /* Add necessary user profile properties */ })) };
//       callback(mockDoc);
//     });

//     // Mock Firestore getDocs function to return the mock query snapshot
//     jest.spyOn(require("firebase/firestore"), "getDocs").mockImplementationOnce(() => Promise.resolve(mockQuerySnapshot));

//     await act(async () => {
//       await waitForNextUpdate();
//     });

//     // Add assertions here based on the expected behavior after fetching user profile
//     expect(isLoading).toBe(false);
//     expect(/* Check if setUserProfile was called with the correct data */).toHaveBeenCalled();
//     expect(userProfile).not.toBeNull();
//   });

//   it("should set user profile to null when username does not exist", async () => {
//     const { result, waitForNextUpdate } = renderHook(() => useGetUserProfileByUsername("nonexistentUsername"));
//     const { isLoading, userProfile } = result.current;

//     // Mock Firestore query and snapshot data
//     const mockQuerySnapshot = {
//       empty: true,
//     };

//     // Mock Firestore getDocs function to return the mock query snapshot
//     jest.spyOn(require("firebase/firestore"), "getDocs").mockImplementationOnce(() => Promise.resolve(mockQuerySnapshot));

//     await act(async () => {
//       await waitForNextUpdate();
//     });

//     // Add assertions here based on the expected behavior when username does not exist
//     expect(isLoading).toBe(false);
//     expect(/* Check if setUserProfile was called with null data */).toHaveBeenCalled();
//     expect(userProfile).toBeNull();
//   });

//   it("should handle errors during user profile fetch", async () => {
//     const { result, waitForNextUpdate } = renderHook(() => useGetUserProfileByUsername("testUsername"));
//     const { isLoading } = result.current;

//     // Mock Firestore getDocs function to throw an error
//     jest.spyOn(require("firebase/firestore"), "getDocs").mockImplementationOnce(() => Promise.reject(new Error("Fetch error")));

//     await act(async () => {
//       await waitForNextUpdate();
//     });

//     // Add assertions here based on the expected behavior after an error during fetch
//     expect(isLoading).toBe(false);
//     expect(/* Check if showToast was called with the correct parameters for an error */).toHaveBeenCalled();
//   });

});