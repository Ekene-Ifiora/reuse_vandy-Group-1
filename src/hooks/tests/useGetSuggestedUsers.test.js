// // Import necessary dependencies and hooks for testing
// import { renderHook, act } from "@testing-library/react";
// import { useGetSuggestedUsers } from "../useGetSuggestedUsers"; // Make sure to update the import path

// // Mock necessary dependencies
// jest.mock("../../store/authStore", () => ({
//   __esModule: true,
//   default: jest.fn(() => ({
//     user: { uid: "testUserId", following: ["user1", "user2"], /* Add other necessary properties */ },
//   })),
// }));
// jest.mock("../useShowToast", () => jest.fn());
// jest.mock("firebase/firestore", () => ({
//   collection: jest.fn(),
//   query: jest.fn(),
//   where: jest.fn(),
//   orderBy: jest.fn(),
//   limit: jest.fn(),
//   getDocs: jest.fn(),
// }));

// describe("useGetSuggestedUsers", () => {
//   it("should initialize with isLoading set to true", () => {
//     const { result } = renderHook(() => useGetSuggestedUsers());
//     expect(result.current.isLoading).toBe(true);
//   });

//   it("should fetch suggested users successfully", async () => {
//     const { result, waitForNextUpdate } = renderHook(() => useGetSuggestedUsers());
//     const { isLoading, suggestedUsers } = result.current;

//     // Mock Firestore query and snapshot data
//     const mockQuerySnapshot = {
//       forEach: jest.fn(),
//     };
//     jest.spyOn(mockQuerySnapshot, "forEach").mockImplementation((callback) => {
//       // Mock each document in the snapshot
//       const mockDoc = { id: "userId", data: jest.fn(() => ({ /* Add necessary user properties */ })) };
//       callback(mockDoc);
//     });

//     // Mock Firestore getDocs function to return the mock query snapshot
//     jest.spyOn(require("firebase/firestore"), "getDocs").mockImplementationOnce(() => Promise.resolve(mockQuerySnapshot));

//     await act(async () => {
//       await waitForNextUpdate();
//     });

//     // Add assertions here based on the expected behavior after fetching suggested users
//     expect(isLoading).toBe(false);
//     expect(/* Check if setSuggestedUsers was called with the correct data */).toHaveBeenCalled();
//     expect(suggestedUsers.length).toBeGreaterThan(0); // Assuming suggested users are present
//   });

//   it("should handle errors during suggested users fetch", async () => {
//     const { result, waitForNextUpdate } = renderHook(() => useGetSuggestedUsers());
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

// });