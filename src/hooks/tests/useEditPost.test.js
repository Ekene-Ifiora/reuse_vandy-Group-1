import { renderHook, act } from '@testing-library/react';
import useAuthStore from "../../store/authStore";
import useShowToast from "../useShowToast";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import usePostStore from "../../store/postStore";
import useEditPost from '../useEditPost';

jest.mock('../../store/postStore');
jest.mock('../../store/authStore');
jest.mock('firebase/storage');
jest.mock('firebase/firestore');
jest.mock('../useShowToast');
jest.mock('../../firebase/firebase');

useAuthStore.mockReturnValue(true);
ref.mockResolvedValue({});
doc.mockResolvedValue({});
uploadString.mockResolvedValue({});
getDownloadURL.mockResolvedValue({});
updateDoc.mockResolvedValue({});

var posts;
const setPosts = (p) => {
    posts = p;
};
usePostStore.mockReturnValue(setPosts);

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

describe('useEditPost', () => {
    it('should not run if not authorized', async () => {
        e2 = 'j';
        useAuthStore.mockReturnValueOnce(false);
        const { result } = renderHook(() => useEditPost());
        const { editPost, isUpdating } = result.current;
        expect(isUpdating).toBe(false);

        const post = {};
        const inputs = {};
        const selectedFile = '';

        await act(async () => {
            await editPost(post, inputs, selectedFile);
        });

        expect(e2).toBe('j');
        expect(isUpdating).toBe(false);
    });

    it('should fail if unknown error', async () => {
        e2 = 'j';
        usePostStore.mockReturnValueOnce(false);
        const { result } = renderHook(() => useEditPost());
        const { editPost, isUpdating } = result.current;
        expect(isUpdating).toBe(false);

        const post = { id: 5 };
        const inputs = {};
        const selectedFile = false;

        await act(async () => {
            await editPost(post, inputs, selectedFile);
        });

        expect(e1).toBe('Error');
        expect(e2).toBe('posts.map is not a function');
        expect(e3).toBe('error');
        expect(isUpdating).toBe(false);
    });

    it('should work if selectedFile', async () => {
        const post = { id: 5, buyNowPrice: 5, description: "k", imageURL: 'k', name: "t" };
        const otherPost = { id: 6, buyNowPrice: 6, description: "1", imageURL: '1', name: "1" };
        usePostStore.mockReturnValueOnce([post, otherPost]);
        e2 = 'j';
        const { result } = renderHook(() => useEditPost());
        const { editPost, isUpdating } = result.current;
        expect(isUpdating).toBe(false);

        const inputs = { id: 5, buyNowPrice: 5, description: "k", imageURL: 'k', name: "t" };
        const selectedFile = true;

        await act(async () => {
            await editPost(post, inputs, selectedFile);
        });

        expect(e1).toBe("Success");
        expect(e2).toBe("Profile updated successfully");
        expect(e3).toBe("success");
        expect(isUpdating).toBe(false);
    });

    it('should work if no selectedFile', async () => {
        const post = { id: 5, buyNowPrice: 5, description: "k", imageURL: 'k', name: "t" };
        const otherPost = { id: 6, buyNowPrice: 6, description: "1", imageURL: '1', name: "1" };
        usePostStore.mockReturnValueOnce([post, otherPost]);
        e2 = 'j';
        const { result } = renderHook(() => useEditPost());
        const { editPost, isUpdating } = result.current;
        expect(isUpdating).toBe(false);

        const inputs = { id: 5, buyNowPrice: 5, description: "k", imageURL: 'k', name: "t" };
        const selectedFile = false;

        await act(async () => {
            await editPost(post, inputs, selectedFile);
        });

        expect(e1).toBe("Success");
        expect(e2).toBe("Profile updated successfully");
        expect(e3).toBe("success");
        expect(isUpdating).toBe(false);
    });

    it('should work if default info', async () => {
        const post = { id: 5, buyNowPrice: 5, description: "k", imageURL: 'k', name: "t" };
        const otherPost = { id: 6, buyNowPrice: 6, description: "1", imageURL: '1', name: "1" };
        usePostStore.mockReturnValueOnce([post, otherPost]);
        e2 = 'j';
        const { result } = renderHook(() => useEditPost());
        const { editPost, isUpdating } = result.current;
        expect(isUpdating).toBe(false);

        const inputs = { id: 5 };
        const selectedFile = false;

        await act(async () => {
            await editPost(post, inputs, selectedFile);
        });

        expect(e1).toBe("Success");
        expect(e2).toBe("Profile updated successfully");
        expect(e3).toBe("success");
        expect(isUpdating).toBe(false);
    });
});
