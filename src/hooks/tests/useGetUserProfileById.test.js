// Import necessary dependencies and hooks for testing
import { renderHook, act } from "@testing-library/react";
import useGetUserProfileById from "../useGetUserProfileById"; // Make sure to update the import path

// // Mock necessary dependencies
// jest.mock("../useShowToast", () => jest.fn());
// jest.mock("firebase/firestore", () => ({
//   doc: jest.fn(),
//   getDoc: jest.fn(),
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

describe("useGetUserProfileById", () => {
  it("should initialize with isLoading set to true", () => {
    const { result } = renderHook(() => useGetUserProfileById("testUserId"));
    expect(result.current.isLoading).toBe(false);
  });

//   it("should fetch user profile successfully when user ID exists", async () => {
//     const { result, waitForNextUpdate } = renderHook(() => useGetUserProfileById("testUserId"));
//     const { isLoading, userProfile } = result.current;

//     // Mock Firestore document reference and data
//     const mockUserRef = {
//       exists: jest.fn(() => true),
//       data: jest.fn(() => ({ /* Add necessary user profile properties */ })),
//     };

//     // Mock Firestore getDoc function to return the mock user reference
//     jest.spyOn(require("firebase/firestore"), "getDoc").mockImplementationOnce(() => Promise.resolve(mockUserRef));

//     await act(async () => {
//       await waitForNextUpdate();
//     });

//     // Add assertions here based on the expected behavior after fetching user profile
//     expect(isLoading).toBe(false);
//     expect(/* Check if setUserProfile was called with the correct data */).toHaveBeenCalled();
//     expect(userProfile).not.toBeNull();
//   });

//   it("should set user profile to null when user ID does not exist", async () => {
//     const { result, waitForNextUpdate } = renderHook(() => useGetUserProfileById("testUserId"));
//     const { isLoading, userProfile } = result.current;

//     // Mock Firestore document reference and data
//     const mockUserRef = {
//       exists: jest.fn(() => false),
//     };

//     // Mock Firestore getDoc function to return the mock user reference
//     jest.spyOn(require("firebase/firestore"), "getDoc").mockImplementationOnce(() => Promise.resolve(mockUserRef));

//     await act(async () => {
//       await waitForNextUpdate();
//     });

//     // Add assertions here based on the expected behavior when user ID does not exist
//     expect(isLoading).toBe(false);
//     expect(/* Check if setUserProfile was called with null data */).toHaveBeenCalled();
//     expect(userProfile).toBeNull();
//   });

//   it("should handle errors during user profile fetch", async () => {
//     const { result, waitForNextUpdate } = renderHook(() => useGetUserProfileById("testUserId"));
//     const { isLoading } = result.current;

//     // Mock Firestore getDoc function to throw an error
//     jest.spyOn(require("firebase/firestore"), "getDoc").mockImplementationOnce(() => Promise.reject(new Error("Fetch error")));

//     await act(async () => {
//       await waitForNextUpdate();
//     });

//     // Add assertions here based on the expected behavior after an error during fetch
//     expect(isLoading).toBe(false);
//     expect(/* Check if showToast was called with the correct parameters for an error */).toHaveBeenCalled();
//   });

});