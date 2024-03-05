import { renderHook, act } from "@testing-library/react";
import usePostComment from "../usePostComment"; // Make sure to update the import path

// Mock necessary dependencies
// jest.mock("react", () => ({
//   ...jest.requireActual("react"),
//   useState: jest.fn(),
// }));
// jest.mock("../useShowToast", () => jest.fn());
// jest.mock("../../store/authStore", () => ({
//   useAuthStore: jest.fn(() => ({
//     user: { uid: "testUserId" },
//   })),
// }));
// jest.mock("../../store/postStore", () => ({
//   usePostStore: jest.fn(() => ({
//     addComment: jest.fn(),
//   })),
// }));
// jest.mock("firebase/firestore", () => ({
//   arrayUnion: jest.fn(),
//   doc: jest.fn(),
//   updateDoc: jest.fn(),
//   firestore: {},
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

describe("usePostComment", () => {
  it("should initialize with correct initial state", () => {
    // Mock useState to return the initial state
    jest.spyOn(require("react"), "useState").mockImplementationOnce(() => [false, jest.fn()]);

    const { result } = renderHook(() => usePostComment());
    const { isCommenting, handlePostComment } = result.current;

    expect(isCommenting).toBe(false);
    expect(typeof handlePostComment).toBe("function");
  });

//   it("should handle posting a comment successfully", async () => {
//     // Mock useState to return the initial state and update function
//     jest.spyOn(require("react"), "useState").mockImplementationOnce(() => [false, jest.fn()]);

//     // Mock necessary functions and data
//     const showToastMock = jest.fn();
//     jest.spyOn(require("../useShowToast"), "default").mockImplementationOnce(() => showToastMock);
//     jest.spyOn(require("firebase/firestore"), "updateDoc").mockImplementationOnce(() => Promise.resolve());
//     jest.spyOn(require("../../store/postStore"), "usePostStore").mockImplementationOnce(() => ({
//       addComment: jest.fn(),
//     }));

//     const { result, waitForNextUpdate } = renderHook(() => usePostComment());
//     const { handlePostComment } = result.current;

//     await act(async () => {
//       await handlePostComment("testPostId", "Test comment");
//       await waitForNextUpdate();
//     });

//     expect(showToastMock).not.toHaveBeenCalledWith("Error", expect.any(String), "error");
//     expect(/* Check if addComment from post store was called with the correct parameters */).toHaveBeenCalled();
//     expect(/* Check if arrayUnion from firestore was called with the correct parameters */).toHaveBeenCalled();
//   });

//   it("should handle errors during the comment process", async () => {
//     // Mock useState to return the initial state and update function
//     jest.spyOn(require("react"), "useState").mockImplementationOnce(() => [false, jest.fn()]);

//     // Mock necessary functions and data to simulate an error during the process
//     const showToastMock = jest.fn();
//     jest.spyOn(require("../useShowToast"), "default").mockImplementationOnce(() => showToastMock);
//     jest.spyOn(require("firebase/firestore"), "updateDoc").mockImplementationOnce(() => Promise.reject(new Error("Test error")));
//     jest.spyOn(require("../../store/postStore"), "usePostStore").mockImplementationOnce(() => ({
//       addComment: jest.fn(),
//     }));

//     const { result, waitForNextUpdate } = renderHook(() => usePostComment());
//     const { handlePostComment } = result.current;

//     await act(async () => {
//       await handlePostComment("testPostId", "Test comment");
//       await waitForNextUpdate();
//     });

//     expect(showToastMock).toHaveBeenCalledWith("Error", "Test error", "error");
//     expect(/* Check if addComment from post store was not called */).not.toHaveBeenCalled();
//     expect(/* Check if arrayUnion from firestore was not called */).not.toHaveBeenCalled();
//   });
});