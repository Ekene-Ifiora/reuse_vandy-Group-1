import { renderHook, act } from "@testing-library/react";
import useSearchUser from "../useSearchUser";

jest.mock('react-firebase-hooks/auth');
jest.mock('../../store/authStore');

// Mock the necessary Firebase functions
jest.mock('firebase/firestore', () => ({
  ...jest.requireActual('firebase/firestore'),
  getFirestore: jest.fn(() => ({
    doc: jest.fn(),
    getDoc: jest.fn(),
  })),
}));

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
});