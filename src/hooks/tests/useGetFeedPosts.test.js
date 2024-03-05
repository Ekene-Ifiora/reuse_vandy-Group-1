// import { renderHook, act } from "@testing-library/react";
// import { useGetFeedPosts } from "../useGetFeedPosts";

// // Mock necessary dependencies
// jest.mock("../../store/postStore", () => ({
//   __esModule: true,
//   default: jest.fn(() => ({
//     posts: [],
//     setPosts: jest.fn(),
//   })),
// }));
// jest.mock("../../store/authStore", () => ({
//   __esModule: true,
//   default: jest.fn(() => ({
//     user: { uid: "testUserId" },
//   })),
// }));
// jest.mock("../useShowToast", () => jest.fn());
// jest.mock("../../store/userProfileStore", () => ({
//   __esModule: true,
//   default: jest.fn(() => ({
//     setUserProfile: jest.fn(),
//   })),
// }));
// jest.mock("firebase/app", () => ({
//   __esModule: true,
//   initializeApp: jest.fn(),
//   getAuth: jest.fn(),
//   getFirestore: jest.fn(),
//   getStorage: jest.fn(),
// }));
// jest.mock("firebase/firestore", () => ({
//   collection: jest.fn(),
//   query: jest.fn(),
//   where: jest.fn(),
//   getDocs: jest.fn(),
// }));

// describe("useGetFeedPosts", () => {
//   it("should initialize with isLoading set to true", () => {
//     const { result } = renderHook(() => useGetFeedPosts());
//     expect(result.current.isLoading).toBe(true);
//   });

//   it("should fetch feed posts successfully", async () => {
//     const { result, waitForNextUpdate } = renderHook(() => useGetFeedPosts());
//     const { isLoading, setPosts } = result.current;

//     // Mock Firestore query and snapshot data
//     const mockQuerySnapshot = {
//       forEach: jest.fn(),
//     };
//     jest.spyOn(mockQuerySnapshot, "forEach").mockImplementation((callback) => {
//       // Mock each document in the snapshot
//       const mockDoc = { id: "postId", data: jest.fn(() => ({ createdAt: Date.now() })) };
//       callback(mockDoc);
//     });

//     jest.spyOn(console, "error").mockImplementation(() => {});

//     // Mock Firestore getDocs function to return the mock query snapshot
//     jest.spyOn(require("firebase/firestore"), "getDocs").mockImplementationOnce(() => Promise.resolve(mockQuerySnapshot));

//     await act(async () => {
//       await waitForNextUpdate();
//     });

//     // Assertions after fetching feed posts
//     expect(isLoading).toBe(false);
//     expect(setPosts).toHaveBeenCalledWith([{ id: "postId", createdAt: expect.any(Number) }]);
//   });

//   it("should handle errors during feed posts fetch", async () => {
//     const { result, waitForNextUpdate } = renderHook(() => useGetFeedPosts());
//     const { isLoading, showToast } = result.current;

//     // Mock Firestore getDocs function to throw an error
//     jest.spyOn(require("firebase/firestore"), "getDocs").mockImplementationOnce(() => Promise.reject(new Error("Fetch error")));

//     await act(async () => {
//       await waitForNextUpdate();
//     });

//     // Assertions after an error during fetch
//     expect(isLoading).toBe(false);
//     expect(showToast).toHaveBeenCalledWith("Error fetching feed posts", "error");
//   });
// });