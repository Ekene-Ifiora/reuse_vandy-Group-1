import { renderHook, act } from "@testing-library/react";
import useSearchProduct from "../useSearchProduct"; // Update the import path

// Mock necessary dependencies
// jest.mock("react", () => ({
//   ...jest.requireActual("react"),
//   useState: jest.fn(),
// }));
// jest.mock("../useShowToast", () => jest.fn());
// jest.mock("firebase/firestore", () => ({
//   ...jest.requireActual("firebase/firestore"),
//   collection: jest.fn(),
//   getDocs: jest.fn(),
//   query: jest.fn(),
//   where: jest.fn(),
// }));

jest.mock('react-firebase-hooks/auth');
jest.mock('../useShowToast');
jest.mock('../../store/authStore');

// Mock the necessary Firebase functions
jest.mock('firebase/firestore', () => ({
  ...jest.requireActual('firebase/firestore'),  // Use the actual implementation for other functions
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

//   it("should handle getting item details successfully", async () => {
//     // Mock useState to return the initial state and update function
//     jest.spyOn(require("react"), "useState").mockImplementationOnce(() => [false, null, jest.fn()]);

//     // Mock necessary Firestore functions and data
//     const showToastMock = jest.fn();
//     jest.spyOn(require("../useShowToast"), "default").mockImplementationOnce(() => showToastMock);

//     const querySnapshot = {
//       empty: false,
//       forEach: jest.fn(),
//     };
//     const getDocsMock = jest.fn(() => Promise.resolve(querySnapshot));
//     const whereMock = jest.fn();
//     const queryMock = jest.fn();

//     jest.spyOn(require("firebase/firestore"), "collection").mockImplementationOnce(jest.fn());
//     jest.spyOn(require("firebase/firestore"), "getDocs").mockImplementationOnce(getDocsMock);
//     jest.spyOn(require("firebase/firestore"), "query").mockImplementationOnce(queryMock);
//     jest.spyOn(require("firebase/firestore"), "where").mockImplementationOnce(whereMock);

//     const { result } = renderHook(() => useSearchProduct());
//     const { getItemDetails } = result.current;

//     await act(async () => {
//       await getItemDetails("testItem");
//     });

//     expect(showToastMock).not.toHaveBeenCalledWith("Error", expect.any(String), "error");
//     expect(result.current.item).not.toBeNull();
//   });

//   it("should show an error toast if no items are found with the given name", async () => {
//     // Mock useState to return the initial state and update function
//     jest.spyOn(require("react"), "useState").mockImplementationOnce(() => [false, null, jest.fn()]);

//     // Mock necessary Firestore functions and data to simulate no items found
//     const showToastMock = jest.fn();
//     jest.spyOn(require("../useShowToast"), "default").mockImplementationOnce(() => showToastMock);

//     const querySnapshot = {
//       empty: true,
//     };
//     const getDocsMock = jest.fn(() => Promise.resolve(querySnapshot));
//     const whereMock = jest.fn();
//     const queryMock = jest.fn();

//     jest.spyOn(require("firebase/firestore"), "collection").mockImplementationOnce(jest.fn());
//     jest.spyOn(require("firebase/firestore"), "getDocs").mockImplementationOnce(getDocsMock);
//     jest.spyOn(require("firebase/firestore"), "query").mockImplementationOnce(queryMock);
//     jest.spyOn(require("firebase/firestore"), "where").mockImplementationOnce(whereMock);

//     const { result } = renderHook(() => useSearchProduct());
//     const { getItemDetails } = result.current;

//     await act(async () => {
//       await getItemDetails("nonexistentItem");
//     });

//     expect(showToastMock).toHaveBeenCalledWith("Error", "Item not found", "error");
//     expect(result.current.item).toBeNull();
//   });

//   it("should show an error toast if an error occurs during the search process", async () => {
//     // Mock useState to return the initial state and update function
//     jest.spyOn(require("react"), "useState").mockImplementationOnce(() => [false, null, jest.fn()]);

//     // Mock necessary Firestore functions and data to simulate an error
//     const showToastMock = jest.fn();
//     jest.spyOn(require("../useShowToast"), "default").mockImplementationOnce(() => showToastMock);

//     const getDocsMock = jest.fn(() => Promise.reject(new Error("Test error")));
//     const whereMock = jest.fn();
//     const queryMock = jest.fn();

//     jest.spyOn(require("firebase/firestore"), "collection").mockImplementationOnce(jest.fn());
//     jest.spyOn(require("firebase/firestore"), "getDocs").mockImplementationOnce(getDocsMock);
//     jest.spyOn(require("firebase/firestore"), "query").mockImplementationOnce(queryMock);
//     jest.spyOn(require("firebase/firestore"), "where").mockImplementationOnce(whereMock);

//     const { result } = renderHook(() => useSearchProduct());
//     const { getItemDetails } = result.current;

//     await act(async () => {
//       await getItemDetails("testItemWithError");
//     });

//     expect(showToastMock).toHaveBeenCalledWith("Error", "Test error", "error");
//     expect(result.current.item).toBeNull();
//   });

});