// // Import necessary dependencies and hooks for testing
// import { renderHook, act } from "@testing-library/react";
// import { useLikePost } from "../useLikePost"; // Make sure to update the import path

// // Mock necessary dependencies
// jest.mock("../../store/authStore", () => ({
//   useAuthStore: jest.fn(() => ({
//     user: { uid: "testUserId" }, // Mock the authenticated user object
//   })),
// }));

// jest.mock("../useShowToast", () => jest.fn());

// jest.mock("firebase/firestore", () => ({
//   doc: jest.fn(),
//   updateDoc: jest.fn(),
// }));

// describe("useLikePost", () => {
//   it("should initialize with correct initial state", () => {
//     const post = { id: "testPostId", likes: ["user1", "user2"] };
//     const { result } = renderHook(() => useLikePost(post));

//     expect(result.current.isLiked).toBe(true);
//     expect(result.current.likes).toBe(post.likes.length);
//     expect(result.current.isUpdating).toBe(false);
//   });

//   it("should handle liking a post", async () => {
//     const post = { id: "testPostId", likes: ["user1", "user2"] };
//     const { result, waitForNextUpdate } = renderHook(() => useLikePost(post));
//     const { isLiked, likes, handleLikePost, isUpdating } = result.current;

//     // Mock Firestore document reference and updateDoc function
//     const mockPostRef = {
//       id: post.id,
//       likes: post.likes,
//     };
//     jest.spyOn(require("firebase/firestore"), "doc").mockImplementationOnce(() => mockPostRef);
//     jest.spyOn(require("firebase/firestore"), "updateDoc").mockImplementationOnce(() => Promise.resolve());

//     await act(async () => {
//       await handleLikePost();
//       await waitForNextUpdate();
//     });

//     // Add assertions here based on the expected behavior after liking a post
//     expect(isLiked).toBe(false);
//     expect(likes).toBe(post.likes.length + 1);
//     expect(isUpdating).toBe(false);
//     expect(/* Check if updateDoc was called with the correct parameters */).toHaveBeenCalled();
//   });

//   it("should handle unliking a post", async () => {
//     const post = { id: "testPostId", likes: ["user1", "user2"], createdBy: "testUserId" };
//     const { result, waitForNextUpdate } = renderHook(() => useLikePost(post));
//     const { isLiked, likes, handleLikePost, isUpdating } = result.current;

//     // Mock Firestore document reference and updateDoc function
//     const mockPostRef = {
//       id: post.id,
//       likes: post.likes,
//     };
//     jest.spyOn(require("firebase/firestore"), "doc").mockImplementationOnce(() => mockPostRef);
//     jest.spyOn(require("firebase/firestore"), "updateDoc").mockImplementationOnce(() => Promise.resolve());

//     await act(async () => {
//       await handleLikePost();
//       await waitForNextUpdate();
//     });

//     // Add assertions here based on the expected behavior after unliking a post
//     expect(isLiked).toBe(true);
//     expect(likes).toBe(post.likes.length);
//     expect(isUpdating).toBe(false);
//     expect(/* Check if updateDoc was called with the correct parameters */).toHaveBeenCalled();
//   });

//   it("should handle errors during like/unlike process", async () => {
//     const post = { id: "testPostId", likes: ["user1", "user2"] };
//     const { result, waitForNextUpdate } = renderHook(() => useLikePost(post));
//     const { handleLikePost, isUpdating } = result.current;

//     // Mock Firestore updateDoc function to throw an error
//     jest.spyOn(require("firebase/firestore"), "updateDoc").mockImplementationOnce(() => Promise.reject(new Error("Update error")));

//     await act(async () => {
//       await handleLikePost();
//       await waitForNextUpdate();
//     });

//     // Add assertions here based on the expected behavior after an error during like/unlike process
//     expect(isUpdating).toBe(false);
//     expect(/* Check if showToast was called with the correct parameters for an error */).toHaveBeenCalled();
//   });

// });