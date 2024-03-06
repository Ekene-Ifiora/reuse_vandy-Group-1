// useFollowUser.test.js
import { renderHook, act, waitFor } from '@testing-library/react';
import useFollowUser from '../useFollowUser';

describe('useFollowUser', () => {
    it('should initialize with isUpdating set to false and isFollowing based on user data', () => {
        const { result } = renderHook(() => useFollowUser("testUserId"));
        expect(result.current.isUpdating).toBe(false);
      
        waitFor(() => {
          expect(result.current.isFollowing).toBe(true);
        });
    });

  it('should handle following/unfollowing users successfully', async () => {
    const { result } = renderHook(() => useFollowUser("testUserId"));
    const { handleFollowUser } = result.current;

    await act(async () => {
      // Mock the implementation of handleFollowUser for successful follow/unfollow
      jest.spyOn(result.current, 'handleFollowUser').mockResolvedValueOnce();

      // Call the handleFollowUser function
      await handleFollowUser();
    });

    // After the isUpdating, isUpdating should be set to false
    expect(result.current.isUpdating).toBe(false);
  });

  it('should handle errors during following/unfollowing users', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useFollowUser("testUserId"));
    const { handleFollowUser } = result.current;

    await act(async () => {
      // Mock the implementation of handleFollowUser to throw an error
      jest.spyOn(result.current, 'handleFollowUser').mockRejectedValueOnce(new Error('Follow/Unfollow failed'));

      // Call the handleFollowUser function
      await handleFollowUser();
    });

    // After the error, isUpdating should be set to false
    expect(result.current.isUpdating).toBe(false);
  });
});