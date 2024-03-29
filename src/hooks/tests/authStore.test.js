import { renderHook, act } from '@testing-library/react';
import useAuthStore from '../../store/authStore';

describe('useAuthStore', () => {
    beforeEach(() => {
        global.localStorage.clear();
    });

    it('should get user info after login', async () => {
        const { result } = renderHook(() => useAuthStore());
        act(() => {
            result.current.login('f');
        });
        expect(result.current.user).toBe('f');
    });

    it('should logout', async () => {
        const { result } = renderHook(() => useAuthStore());
        act(() => {
            result.current.login('f');
            result.current.logout();
        });
        expect(result.current.user).toBeNull();
    });

    it('should set user', async () => {
        const { result } = renderHook(() => useAuthStore());
        act(() => {
            result.current.setUser('f');
        });
        expect(result.current.user).toBe('f');
    });
});