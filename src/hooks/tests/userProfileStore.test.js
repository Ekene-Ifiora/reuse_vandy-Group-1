import { renderHook, act } from '@testing-library/react';
import useUserProfileStore from '../../store/userProfileStore';

describe('userProfileStore', () => {
    it('should set initial state', async () => {
        const { result } = renderHook(() => useUserProfileStore());
        expect(result.current.userProfile).toBeNull();
    });

    it('should setUserProfile', async () => {
        const { result } = renderHook(() => useUserProfileStore());
        act(() => {
            result.current.setUserProfile({ id: 1 });
        });
        expect(result.current.userProfile).toEqual({ id: 1 });
    });

    it('should add and delete posts', async () => {
        const { result } = renderHook(() => useUserProfileStore());
        act(() => {
            result.current.setUserProfile({ id: 1, posts: [ 5 ] });
            result.current.addPost({ id: 6 });
        });
        expect(result.current.userProfile).toEqual({ id: 1, posts: [ 6, 5 ]});

        act(() => {
            result.current.deletePost(5);
        });
        expect(result.current.userProfile).toEqual({ id: 1, posts: [ 6 ]});
    });
});