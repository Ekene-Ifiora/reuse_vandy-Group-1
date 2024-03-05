import { renderHook, act } from "@testing-library/react";
import useGetFeedPosts from "../useGetFeedPosts";

// Mock necessary dependencies
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
//   getAuth: jest.fn(() => ({
//     onAuthStateChanged: jest.fn(),
//   })),
//   getFirestore: jest.fn(() => ({
//     collection: jest.fn(),
//     query: jest.fn(),
//     where: jest.fn(),
//     getDocs: jest.fn(() => ({ forEach: jest.fn() })),
//   })),
//   getStorage: jest.fn(() => ({})),
// }));

// jest.mock("firebase/firestore", () => ({
//   __esModule: true,
//   collection: jest.fn(),
//   query: jest.fn(),
//   where: jest.fn(),
//   getDocs: jest.fn(),
// }));

jest.mock('react-firebase-hooks/auth');
jest.mock('../useShowToast');
jest.mock('../../store/authStore');

// Mock the necessary Firebase functions
jest.mock('firebase/firestore', () => ({
  ...jest.requireActual('firebase/firestore'),  // Use the actual implementation for other functions
  getFirestore: jest.fn(() => ({
    doc: jest.fn(),
    getDoc: jest.fn(),
  })),
}));

describe("useGetFeedPosts", () => {
  it("should initialize with isLoading set to true", () => {
    const { result } = renderHook(() => useGetFeedPosts());
    expect(result.current.isLoading).toBe(true);
  });

//   it("should fetch feed posts successfully", async () => {
//     const { result, waitForNextUpdate } = renderHook(() => useGetFeedPosts());
//     const { isLoading, setPosts } = result.current;

//     // Mock Firestore query and snapshot data
//     const mockQuerySnapshot = {
//       forEach: jest.fn(),
//     };

//     // Mock each document in the snapshot
//     const mockDoc = { id: "postId", data: jest.fn(() => ({ createdAt: Date.now() })) };
//     mockQuerySnapshot.forEach.mockImplementation((callback) => {
//       callback(mockDoc);
//     });

//     // Mock Firestore getDocs function to return the mock query snapshot
//     jest.spyOn(require("firebase/firestore"), "getDocs").mockResolvedValueOnce(mockQuerySnapshot);

//     await waitForNextUpdate();

//     // Assertions after fetching feed posts
//     expect(isLoading).toBe(false);
//     expect(setPosts).toHaveBeenCalledWith([{ id: "postId", createdAt: expect.any(Number) }]);
//   });

//   it("should handle errors during feed posts fetch", async () => {
//     const { result, waitForNextUpdate } = renderHook(() => useGetFeedPosts());
//     const { isLoading, showToast } = result.current;

//     // Mock Firestore getDocs function to throw an error
//     jest.spyOn(require("firebase/firestore"), "getDocs").mockRejectedValueOnce(new Error("Fetch error"));

//     await waitForNextUpdate();

//     // Assertions after an error during fetch
//     expect(isLoading).toBe(false);
//     expect(showToast).toHaveBeenCalledWith("Error fetching feed posts", "error");
//   });
});