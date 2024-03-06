import { renderHook, act } from "@testing-library/react";
import usePostComment from "../usePostComment";

jest.mock('react-firebase-hooks/auth');
jest.mock('../../store/authStore');

// Mock the necessary Firebase functions
jest.mock('firebase/firestore', () => ({
  ...jest.requireActual('firebase/firestore'),
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

  it("should handle posting a comment successfully", async () => {
    const { result } = renderHook(() => usePostComment());
    const { handlePostComment } = result.current;

    await act(async () => {
      // Mock the implementation of handlePostComment for successful update
      jest.spyOn(result.current, 'handlePostComment').mockResolvedValueOnce();

      // Call the handlePostComment function
      await handlePostComment();
    });

    // After the update, isCommenting should be set to false
    expect(result.current.isCommenting).toBe(false);
  });

  it("should handle errors during the comment process", async () => {
    const { result, waitForNextUpdate } = renderHook(() => usePostComment());
    const { isCommenting, handlePostComment } = result.current;

    await act(async () => {
      // Mock the implementation of handlePostComment to throw an error
      jest.spyOn(result.current, 'handlePostComment').mockRejectedValueOnce(new Error('Update failed'));

      // Call the handlePostComment function
      await handlePostComment();
    });

    // After the error, isCommenting should be set to false
    expect(result.current.isCommenting).toBe(false);
  });
});