import { renderHook, act } from "@testing-library/react";
import useSearchUser from "../useSearchUser";
import useShowToast from "../useShowToast";
import { collection, getDocs, query, where } from "firebase/firestore";

jest.mock('react-firebase-hooks/auth');
jest.mock('../../store/authStore');
jest.mock('firebase/firestore');
jest.mock('../useShowToast');
jest.mock('../../firebase/firebase');

collection.mockResolvedValue({});
getDocs.mockResolvedValue([{data: () => {return "j";}}]);
query.mockResolvedValue({});
where.mockResolvedValue({});

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

describe("useSearchUser", () => {
  it("should initialize with correct initial state", () => {
    // Mock useState to return the initial state
    jest.spyOn(require("react"), "useState").mockImplementationOnce(() => [false, null, jest.fn()]);

    const { result } = renderHook(() => useSearchUser()); // Invoke the hook function
    const { isLoading, getUserProfile, user, setUser } = result.current;

    expect(isLoading).toBe(false);
    expect(typeof getUserProfile).toBe("function");
    expect(user).toBeNull();
    expect(typeof setUser).toBe("function");
  });

  it("should handle getting user details successfully", async () => {
    const { result } = renderHook(() => useSearchUser());
    const { getUserProfile } = result.current;

    await act(async () => {
      // Mock the implementation of getUserProfile for successful update
      jest.spyOn(result.current, 'getUserProfile').mockResolvedValueOnce();

      // Call the getUserProfile function
      await getUserProfile();
    });

    // After the update, isLoading should be set to false
    expect(result.current.isLoading).toBe(false);
  });

  it("should show an error toast if no users are found with the given username", async () => {
    const { result } = renderHook(() => useSearchUser());
    const { getUserProfile } = result.current;

    await act(async () => {
    // Mock the implementation of getUserProfile to throw an error
        jest.spyOn(result.current, 'getUserProfile').mockRejectedValueOnce(new Error('Update failed'));

    // Call the getUserProfile function
        await getUserProfile();
    });

    // After the error, isLoading should be set to false
    expect(result.current.isLoading).toBe(false);
  });

  it('should work', async () => {
    const { result } = renderHook(() => useSearchUser());
    const { getUserProfile } = result.current;

    const username = "j";

    await act(async () => {
      await getUserProfile(username);
    });

    expect(result.current.user).toBe("j");
  });

  it('should fail if query snapshot is empty', async () => {
    const { result } = renderHook(() => useSearchUser());
    const { getUserProfile } = result.current;

    const username = "j";

    getDocs.mockResolvedValueOnce({empty: true});

    await act(async () => {
      await getUserProfile(username);
    });

    expect(e1).toBe("Error");
    expect(e2).toBe("User not found")
    expect(e3).toBe("error");
  });

  it('expect works if error', async () => {
    const { result } = renderHook(() => useSearchUser());
    const { getUserProfile } = result.current;

    const username = "j";

    getDocs.mockResolvedValue([{x: () => {return "j";}}]);

    await act(async () => {
      await getUserProfile(username);
    });

    expect(e1).toBe("Error");
    expect(e2).toBe("doc.data is not a function")
    expect(e3).toBe("error");
  });
});