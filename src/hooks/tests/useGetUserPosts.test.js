import { renderHook, waitFor } from "@testing-library/react";
import useGetUserPosts from "../useGetUserPosts";
import usePostStore from "../../store/postStore";
import useAuthStore from "../../store/authStore";
import useShowToast from "../useShowToast";
import useUserProfileStore from "../../store/userProfileStore";
import { collection, getDocs, query, where } from "firebase/firestore";

jest.mock('react-firebase-hooks/auth');
jest.mock('../useShowToast');
jest.mock('../../store/authStore');
jest.mock('firebase/firestore');
jest.mock('../../store/userProfileStore');
jest.mock('../../store/postStore');

collection.mockResolvedValue({});
getDocs.mockResolvedValue({});
query.mockResolvedValue({});
where.mockResolvedValue({});

var posts = "";
const setPosts = (posting) => {
  posts = posting;
};
usePostStore.mockReturnValue({ posts, setPosts });

const setUserProfile = () => { return true; };
useUserProfileStore.mockReturnValue({ setUserProfile });

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

describe("useGetUserPosts", () => {
  it('should not work if no user profile', async () => {
    useUserProfileStore.mockReturnValueOnce(false);

    const { result } = renderHook(() => useGetUserPosts());
    const { isLoading, posts } = result.current;

    expect(isLoading).toBe(true);
    expect(posts).toBe("");
  });

  it('should work if error thrown', async () => {
    getDocs.mockResolvedValueOnce([0]);
    const { result } = renderHook(() => useGetUserPosts());
    const { isLoading, posts } = result.current;

    waitFor(() => {
      expect(isLoading).toBe(false);
      expect(posts).toBe("");
      expect(e1).toBe("Error");
      expect(e2).toBe("doc.data is not a function");
      expect(e3).toBe("error");
    });
  });

  it('should work if authorized', async () => {
    e2 = "j";
    useAuthStore.mockReturnValueOnce(false);
    getDocs.mockResolvedValueOnce([ { id: 5, data: () => { return { createdAt: 1 }; } } ]);

    const { result } = renderHook(() => useGetUserPosts());
    const { isLoading, posts } = result.current;

    waitFor(() => {
      expect(isLoading).toBe(false);
      expect(posts).toBe({ id: 5, createdAt: 1 });
      expect(e2).toBe("j");
    });
  });

  it('should work if multiple posts', async () => {
    e2 = "j";
    useAuthStore.mockReturnValueOnce(false);
    getDocs.mockResolvedValueOnce([ { id: 5, data: () => { return { createdAt: 2 }; } }, { id: 6, data: () => { return { createdAt: 1 }; } } ]);

    const { result } = renderHook(() => useGetUserPosts());
    const { isLoading, posts } = result.current;

    waitFor(() => {
      expect(isLoading).toBe(false);
      expect(posts).toBe([{ id: 6, createdAt: 1 }, { id: 5, createdAt: 2}]);
      expect(e2).toBe("j");
    });
  });
});