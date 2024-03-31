import { renderHook, waitFor } from "@testing-library/react";
import useGetSuggestedUsers from "../useGetSuggestedUsers";
import useAuthStore from "../../store/authStore";
import useShowToast from "../useShowToast";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";

jest.mock('react-firebase-hooks/auth');
jest.mock('../useShowToast');
jest.mock('../../store/authStore');
jest.mock('firebase/firestore');

collection.mockResolvedValue({});
getDocs.mockResolvedValue({});
limit.mockResolvedValue({});
orderBy.mockResolvedValue({});
query.mockResolvedValue({});
where.mockResolvedValue({});
useAuthStore.mockReturnValue(true);

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

describe("useGetSuggestedUsers", () => {
  it('should not run if not authorized', async () => {
    useAuthStore.mockReturnValueOnce(false);
    const { result } = renderHook(() => useGetSuggestedUsers());
    const { isLoading, suggestedUsers } = result.current;

    expect(isLoading).toBe(true);
    expect(suggestedUsers).toEqual([]);
  });

  it('should fail if unknown error', () => {
    e2 = "f";
    getDocs.mockResolvedValue([{ id: 1, data: 5 }]);
    const { result } = renderHook(() => useGetSuggestedUsers());
    const { isLoading, suggestedUsers } = result.current;

    waitFor(() => {
      expect(isLoading).toBe(false);
      expect(suggestedUsers).toEqual([]);

      expect(e1).toBe("Error");
      expect(e2).toBe("j");
      expect(e3).toBe("error");
    });
  });

  it('should work', () => {
    e2 = "q";
    useAuthStore.mockReturnValueOnce( { uid: 1, following: 2 });
    getDocs.mockResolvedValue([{ id: 1, data: () => { return 5; } }]);
    const { result } = renderHook(() => useGetSuggestedUsers());
    const { isLoading, suggestedUsers } = result.current;

    waitFor(() => {
      expect(isLoading).toBe(false);
      expect(suggestedUsers).toBe([{ data: 5, id: 1 }]);
      expect(e2).toBe("q");
    });
  });

});
