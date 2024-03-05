// useEditProfile.test.js
import { renderHook, act } from '@testing-library/react';
import useEditProfile from '../useEditProfile';

describe('useEditProfile', () => {
  it('should initialize with isUpdating set to false', () => {
    const { result } = renderHook(() => useEditProfile());
    expect(result.current.isUpdating).toBe(false);
  });

  it('should update profile successfully', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useEditProfile());
    const { editProfile } = result.current;

    await act(async () => {
      // Mock the implementation of editProfile for successful update
      jest.spyOn(result.current, 'editProfile').mockResolvedValueOnce();

      // Call the editProfile function
      await editProfile();
    });

    // After the update, isUpdating should be set to false
    expect(result.current.isUpdating).toBe(false);
  });

  it('should handle errors during profile update', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useEditProfile());
    const { editProfile } = result.current;

    await act(async () => {
      // Mock the implementation of editProfile to throw an error
      jest.spyOn(result.current, 'editProfile').mockRejectedValueOnce(new Error('Update failed'));

      // Call the editProfile function
      await editProfile();
    });

    // After the error, isUpdating should be set to false
    expect(result.current.isUpdating).toBe(false);
  });
});