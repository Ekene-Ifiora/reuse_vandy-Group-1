// // Import necessary dependencies and hooks for testing
// import { renderHook, act } from "@testing-library/react";
// import { useGetUserPosts } from "../useGetUserPosts"; // Make sure to update the import path

// // Mock necessary dependencies
// jest.mock("../../store/postStore", () => ({
//   __esModule: true,
//   default: jest.fn(() => ({
//     posts: [],
//     setPosts: jest.fn(),
//   })),
// }));
// jest.mock("../useShowToast", () => jest.fn());
// jest.mock("../../store/userProfileStore", () => ({
//   __esModule: true,
//   default: jest.fn(() => ({
//     userProfile: { uid: "testUserId", /* Add other necessary properties */ },
//   })),
// }));
// jest.mock("firebase/firestore", () => ({
//   collection: jest.fn(),
//   query: jest.fn(),
//   where: jest.fn(),
//   getDocs: jest.fn(),
// }));

// describe("useGetUserPosts", () => {
//   it("should initialize with isLoading set to true", () => {
//     const { result } = renderHook(() => useGetUserPosts());
//     expect(result.current.isLoading).toBe(true);
//   });

//   it("should fetch user-specific posts successfully", async () => {
//     const { result, waitForNextUpdate } = renderHook(() => useGetUserPosts());
//     const { isLoading, posts } = result.current;

//     // Mock Firestore query and snapshot data
//     const mockQuerySnapshot = {
//       forEach: jest.fn(),
//     };
//     jest.spyOn(mockQuerySnapshot, "forEach").mockImplementation((callback) => {
//       // Mock each document in the snapshot
//       const mockDoc = { id: "postId", data: jest.fn(() => ({ createdAt: Date.now() })) };
//       callback(mockDoc);
//     });

//     // Mock Firestore getDocs function to return the mock query snapshot
//     jest.spyOn(require("firebase/firestore"), "getDocs").mockImplementationOnce(() => Promise.resolve(mockQuerySnapshot));

//     await act(async () => {
//       await waitForNextUpdate();
//     });

//     // Add assertions here based on the expected behavior after fetching user-specific posts
//     expect(isLoading).toBe(false);
//     expect(/* Check if setPosts was called with the correct data */).toHaveBeenCalled();
//     expect(posts.length).toBeGreaterThan(0); // Assuming user-specific posts are present
//   });

//   it("should handle errors during user-specific posts fetch", async () => {
//     const { result, waitForNextUpdate } = renderHook(() => useGetUserPosts());
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