// useEditProfile.test.js
// Import necessary dependencies and hooks from React and Firebase
import useShowToast from "../useShowToast";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { firestore, storage } from "../../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import useUserProfileStore from "../../store/userProfileStore";
import { renderHook, act } from '@testing-library/react';
import useEditProfile from '../useEditProfile';
import useAuthStore from "../../store/authStore";

jest.mock('firebase/firestore');
jest.mock('../../store/authStore');
jest.mock('../../firebase/firebase');
jest.mock('../useShowToast');
jest.mock('firebase/storage');
jest.mock('../../store/userProfileStore');

ref.mockResolvedValue({});
doc.mockResolvedValue({});
updateDoc.mockResolvedValue({});
getDownloadURL.mockResolvedValue({});
uploadString.mockResolvedValue({});
useAuthStore.mockReturnValue((_) => { return true; });
useUserProfileStore.mockReturnValue((_) => { return true; });

var e1;
var e2;
var e3;
useShowToast.mockImplementation(() => {
  const showToast = (error1, error2, error3) => {
    e1 = error1; 
    e2 = error2; 
    e3 = error3;
  }
  return showToast;
});

describe('useEditProfile', () => {
  it('should initialize with isUpdating set to false', () => {
    const { result } = renderHook(() => useEditProfile());
    expect(result.current.isUpdating).toBe(false);
  });

  it('should run successfully', async () => {
    const { result } = renderHook(() => useEditProfile());
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
    const { result } = renderHook(() => useEditProfile());
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

  it('should edit successfully', async () => {
    const { result } = renderHook(() => useEditProfile());
    const { editProfile } = result.current;

    await act(async () => {
      jest.spyOn(result.current, 'editProfile');

      const inputs = {
        fullname: "n",
        username: "nm",
        bio: "i want"
      }

      const selectedFile = true;

      await editProfile(inputs, selectedFile);
    });

    expect(e1).toBe('Success');
    expect(e2).toBe("Profile updated successfully");
    expect(e3).toBe("success");

    expect(result.current.isUpdating).toBe(false);
  });

  it('should edit successfully with fallback', async () => {
    e2 = "f";
    useAuthStore.mockReturnValueOnce({ fullName: "name", username: "user", bio: "bio", profilePicURL: "url" });
    const { result } = renderHook(() => useEditProfile());
    const { editProfile } = result.current;

    await act(async () => {
      jest.spyOn(result.current, 'editProfile');

      const inputs = {
        x: "j"
      }

      const selectedFile = false;

      await editProfile(inputs, selectedFile);
    });

    expect(e1).toBe('Success');
    expect(e2).toBe("Profile updated successfully");
    expect(e3).toBe("success");

    expect(result.current.isUpdating).toBe(false);
  });
});