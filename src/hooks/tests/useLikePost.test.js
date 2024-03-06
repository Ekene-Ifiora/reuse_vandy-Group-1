// Import necessary dependencies and hooks for testing
import { renderHook, act } from "@testing-library/react";
import useLikePost from "../useLikePost";

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

describe("useLikePost", () => {
  it("should initialize with correct initial state", () => {
    const post = { id: "testPostId", likes: ["user1", "user2"] };
    const { result } = renderHook(() => useLikePost(post));

    expect(result.current.isLiked).toBe(false);
    expect(result.current.likes).toBe(post.likes.length);
    expect(result.current.isUpdating).toBe(false);
  });

  it("should handle liking a post", async () => {
    const post = { id: "testPostId", likes: ["user1", "user2"] };
    const { result } = renderHook(() => useLikePost(post));
    const { handleLikePost } = result.current;

    await act(async () => {
      // Mock the implementation of handleLikePost for successful update
      jest.spyOn(result.current, 'handleLikePost').mockResolvedValueOnce();

      // Call the editProfile function
      await handleLikePost();
    });

    // After the update, isUpdating should be set to false
    expect(result.current.isUpdating).toBe(false);
  });

  it("should handle errors during like/unlike process", async () => {
    const post = { id: "testPostId", likes: ["user1", "user2"] };
    const { result } = renderHook(() => useLikePost(post));
    const { handleLikePost } = result.current;

    await act(async () => {
      // Mock the implementation of handleLikePost to throw an error
      jest.spyOn(result.current, 'handleLikePost').mockRejectedValueOnce(new Error('Update failed'));

      // Call the handleLikePost function
      await handleLikePost();
    });

    // After the error, isUpdating should be set to false
    expect(result.current.isUpdating).toBe(false);
  });
});