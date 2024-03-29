import { renderHook, act } from '@testing-library/react';
import usePostStore from '../../store/postStore';

describe('usePostStore', () => {
  it('should add a post', () => {
    const { result } = renderHook(() => usePostStore());
    act(() => {
      result.current.createPost({ id: 1, title: 'Test Post' });
    });
    expect(result.current.posts).toEqual([{ id: 1, title: 'Test Post' }]);
  });

  it('should delete a post', () => {
    const { result } = renderHook(() => usePostStore());
    act(() => {
      result.current.createPost({ id: 1, title: 'Test Post' });
      result.current.deletePost(1);
    });
    expect(result.current.posts).toEqual([]);
  });

  it('should add a comment to a post', () => {
    const { result } = renderHook(() => usePostStore());
    act(() => {
      result.current.createPost({ id: 1, title: 'Test Post', comments: [] });
      result.current.addComment(1, 'This is a comment');
    });
    expect(result.current.posts[0].comments).toEqual(['This is a comment']);
    act(() => {
      result.current.deletePost(1);
    });
  });

  it('should add a comment to a post different id', () => {
    const { result } = renderHook(() => usePostStore());
    act(() => {
      result.current.createPost({ id: 1, title: 'Test Post', comments: [] });
      result.current.addComment(2, 'This is a comment');
    });
    expect(result.current.posts[0].comments).toEqual([]);
  });

  it('should set posts', () => {
    const { result } = renderHook(() => usePostStore());
    act(() => {
      result.current.setPosts([{ id: 1, title: 'Test Post' }]);
    });
    expect(result.current.posts).toEqual([{ id: 1, title: 'Test Post' }]);
  });
});