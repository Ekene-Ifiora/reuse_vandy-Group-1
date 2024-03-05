import { renderHook, act } from "@testing-library/react";
// import 'firebase/firestore';
import useGetSuggestedUsers from "../useGetSuggestedUsers";

// Mock necessary dependencies
// jest.mock("../../store/authStore", () => ({
//   __esModule: true,
//   default: jest.fn(() => ({
//     user: { uid: "testUserId", following: ["user1", "user2"] },
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

// jest.mock("firebase/firestore", () => ({
//     ...jest.requireActual("firebase/firestore"),
//     getDocs: jest.fn(),
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

describe("useGetSuggestedUsers", () => {
  it("should initialize with isLoading set to true", () => {
    const { result } = renderHook(() => useGetSuggestedUsers());
    expect(result.current.isLoading).toBe(true);
  });

//   it("should fetch suggested users successfully", async () => {
//     const { result, waitForNextUpdate } = renderHook(() => useGetSuggestedUsers());
//     const { isLoading, suggestedUsers, setSuggestedUsers } = result.current;

//     // Mock Firestore query and snapshot data
//     const mockQuerySnapshot = {
//       forEach: jest.fn(),
//     };
//     jest.spyOn(mockQuerySnapshot, "forEach").mockImplementation((callback) => {
//       // Mock each document in the snapshot
//       const mockDoc = { id: "userId", data: jest.fn(() => ({ username: "testUser" })) };
//       callback(mockDoc);
//     });

//     // Mock Firestore getDocs function to return the mock query snapshot
//     jest.spyOn(require("firebase/firestore"), "getDocs").mockImplementationOnce(() => Promise.resolve(mockQuerySnapshot));

//     await act(async () => {
//     //   await waitForNextUpdate();
//     });

//     // Assertions after fetching suggested users
//     expect(isLoading).toBe(false);
//     expect(setSuggestedUsers).toHaveBeenCalledWith([{ id: "userId", username: "testUser" }]);
//     expect(suggestedUsers.length).toBeGreaterThan(0);
//   });

//   it("should handle errors during suggested users fetch", async () => {
    // const { result, waitForNextUpdate } = renderHook(() => useGetSuggestedUsers());
    // const { isLoading, showToast } = result.current;
    // // Mock Firestore getDocs function to throw an error
    // jest.spyOn(require("firebase/firestore"), "getDocs").mockImplementationOnce(() => Promise.reject(new Error("Fetch error")));

    // await act(async () => {
    // //   await waitForNextUpdate();
    // });

    // // Assertions after an error during fetch
    // expect(isLoading).toBe(false);
    // expect(showToast).toHaveBeenCalledWith("Error fetching suggested users", "error");

    // const error = { message: 'Error fetching suggested users', error: "error" };

    // mockSignInWithEmailAndPassword.mockRejectedValue(error);

    // const { result } = renderHook(() => useGetSuggestedUsers());

    // await act(async () => {
    //   await result.current.suggestedUsers();
    // });

    // expect(mockShowToast).toHaveBeenCalledWith('Error', error.message, 'error');
//   });
});
