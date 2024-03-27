import { renderHook, act } from "@testing-library/react";
import useSearchProduct from "../useSearchProduct";
import useShowToast from "../useShowToast";
import { collection, getDocs, query, where } from "firebase/firestore";

jest.mock('react-firebase-hooks/auth');
jest.mock('../../store/authStore');
jest.mock('firebase/firestore');
jest.mock('../useShowToast');

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

collection.mockResolvedValue({});
getDocs.mockResolvedValue([{data: () => {return "j";}}]);
query.mockResolvedValue({});
where.mockResolvedValue({});

describe("useSearchProduct", () => {
  it("should initialize with correct initial state", () => {
    // Mock useState to return the initial state
    jest.spyOn(require("react"), "useState").mockImplementationOnce(() => [false, null, jest.fn()]);

    const { result } = renderHook(() => useSearchProduct());
    const { isLoading, getItemDetails, items, setItem } = result.current;

    expect(isLoading).toBe(false);
    expect(typeof getItemDetails).toBe("function");
    expect(items).toStrictEqual([]);
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

  it('should fail when no itemName', async () => {
    e1 = "e";
    const { result } = renderHook(() => useSearchProduct());
    const { getItemDetails } = result.current;

    const item = "";

    await act(async () => {
      await getItemDetails(item);
    });

    expect(e1).toBe("e");
  });

  it('should fail when no item found', async () => {
    const { result } = renderHook(() => useSearchProduct());
    const { getItemDetails } = result.current;

    const item = "a";

    getDocs.mockResolvedValue([]);

    await act(async () => {
      await getItemDetails(item);
    });

    getDocs.mockResolvedValue([{data: () => {return "j";}}]);

    expect(e1).toBe("Error");
    expect(e2).toBe("Item not found");
    expect(e3).toBe("error");
  });

  it('should succeed', async () => {
    e1 = "e";
    const { result } = renderHook(() => useSearchProduct());
    const { getItemDetails } = result.current;

    const item = "a";

    await act(async () => {
      await getItemDetails(item);
    });

    expect(result.current.items).toEqual(['j', 'j', 'j', 'j']);

    expect(e1).toBe("e");
  });

  it('should work if unknown error', async () => {
    e1 = "e";
    const { result } = renderHook(() => useSearchProduct());
    const { getItemDetails } = result.current;

    const item = "a";

    getDocs.mockResolvedValueOnce([{x: () => {return "j";}}]);

    await act(async () => {
      await getItemDetails(item);
    });

    expect(e1).toBe("Error");
    expect(e2).toBe("doc.data is not a function");
    expect(e3).toBe("error");
    expect(result.current.items).toEqual([]);
  });

});