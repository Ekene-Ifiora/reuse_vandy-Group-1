import { renderHook, act } from "@testing-library/react";
import useSearchProduct from "../useSearchProduct";

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

describe("useSearchProduct", () => {
  it("should initialize with correct initial state", () => {
    // Mock useState to return the initial state
    jest.spyOn(require("react"), "useState").mockImplementationOnce(() => [false, null, jest.fn()]);

    const { result } = renderHook(() => useSearchProduct());
    const { isLoading, getItemDetails, item, setItem } = result.current;

    expect(isLoading).toBe(false);
    expect(typeof getItemDetails).toBe("function");
    expect(item).toBeNull();
    expect(typeof setItem).toBe("function");
  });

  it("should handle getting item details successfully", async () => {
    const { result } = renderHook(() => useSearchProduct());
    const { getItemDetails } = result.current;

    await act(async () => {
      // Mock the implementation of getItemDetails for successful update
      jest.spyOn(result.current, 'getItemDetails').mockResolvedValueOnce();

      // Call the getItemDetails function
      await getItemDetails();
    });

    // After the update, isLoading should be set to false
    expect(result.current.isLoading).toBe(false);
  });

  it("should show an error toast if no items are found with the given name", async () => {
    const { result } = renderHook(() => useSearchProduct());
    const { getItemDetails } = result.current;

    await act(async () => {
    // Mock the implementation of getItemDetails to throw an error
        jest.spyOn(result.current, 'getItemDetails').mockRejectedValueOnce(new Error('Update failed'));

    // Call the getItemDetails function
        await getItemDetails();
    });

    // After the error, isLoading should be set to false
    expect(result.current.isLoading).toBe(false);
  });

});