// useFollowUser.test.js
import { renderHook, act, waitFor } from '@testing-library/react';
import useFollowUser from '../useFollowUser';
import useAuthStore from "../../store/authStore";
import useUserProfileStore from "../../store/userProfileStore";
import useShowToast from "../useShowToast";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

jest.mock('react-firebase-hooks/auth');
jest.mock('../../store/authStore');
jest.mock('../useShowToast');
jest.mock('firebase/firestore');
jest.mock('../../store/userProfileStore');

var userProfile;
const setUserProfile = (input) => {
  userProfile = input;
};
useUserProfileStore.mockReturnValue({ userProfile, setUserProfile });

arrayRemove.mockResolvedValue({});
arrayUnion.mockResolvedValue({});
doc.mockResolvedValue({});
updateDoc.mockResolvedValue({});

var authUser;
const setAuthUser = (input) => {
  authUser = input;
};
useAuthStore.mockReturnValue(setAuthUser);

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

describe('useFollowUser', () => {
    it('should not run if not authorized', () => {
      useAuthStore.mockReturnValue(false);

      const { result } = renderHook(() => useFollowUser(5));
      const { isUpdating, isFollowing, handleFollowUser } = result.current;
      
      expect(isUpdating).toBe(false);
      expect(isFollowing).toBe(false);
    });

    it('should set following to true if authorized', () => {
      useAuthStore.mockReturnValueOnce({following: [5]});

      const { result } = renderHook(() => useFollowUser(6));
      const { isUpdating, isFollowing, handleFollowUser } = result.current;
      
      expect(isUpdating).toBe(false);
      expect(isFollowing).toBe(false);
    });

    it('should set isFollowing to false if authorized', () => {
      useAuthStore.mockReturnValueOnce({following: [5]});

      const { result } = renderHook(() => useFollowUser(5));
      const { isUpdating, isFollowing, handleFollowUser } = result.current;
      
      waitFor(() => {
        expect(isUpdating).toBe(false);
        expect(isFollowing).toBe(true);
      });
    });

    it('should work if isFollowing and not userProfile', () => {
      userProfile = undefined;
      authUser = undefined;
      useAuthStore.mockReturnValueOnce({following: [5, 6]});

      const { result } = renderHook(() => useFollowUser(5));
      const { isUpdating, isFollowing, handleFollowUser } = result.current;

      waitFor(() => {
        expect(isUpdating).toBe(false);
        expect(isFollowing).toBe(true);
      });

      act(() => {
        handleFollowUser();
      });

      waitFor(() => {
        expect(authUser).toBe({following: [6]});
        expect(isUpdating).toBe(false);
        expect(isFollowing).toBe(false);
      });
    });

    it('should work if isFollowing and userProfile', () => {
      useAuthStore.mockReturnValueOnce({following: [5, 6]});
      authUser = undefined;
      userProfile = true;

      const { result } = renderHook(() => useFollowUser(5));
      const { isUpdating, isFollowing, handleFollowUser } = result.current;

      waitFor(() => {
        expect(isUpdating).toBe(false);
        expect(isFollowing).toBe(true);
      });

      act(() => {
        handleFollowUser();
      });

      waitFor(() => {
        expect(authUser).toBe({following: [6]});
        expect(userProfile).toBe({following: [6]});
        expect(isUpdating).toBe(false);
        expect(isFollowing).toBe(false);
      });
    });

    it('should work if not isFollowing and not userProfile', () => {
      userProfile = undefined;
      authUser = undefined;
      useAuthStore.mockReturnValueOnce({following: [5, 6]});

      const { result } = renderHook(() => useFollowUser(4));
      const { isUpdating, isFollowing, handleFollowUser } = result.current;

      waitFor(() => {
        expect(isUpdating).toBe(false);
        expect(isFollowing).toBe(false);
      });

      act(() => {
        handleFollowUser();
      });

      waitFor(() => {
        expect(authUser).toBe({following: [4, 5, 6]});
        expect(userProfile).toBe({following: [4, 5, 6]});
        expect(isUpdating).toBe(false);
        expect(isFollowing).toBe(false);
      });
    });
});