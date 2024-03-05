// import { renderHook, act } from "@testing-library/react";
// import useSearchUser from "../useSearchUser"; // Update the import path

// // Mock necessary dependencies
// jest.mock("react", () => ({
//   ...jest.requireActual("react"),
//   useState: jest.fn(),
// }));
// jest.mock("../useShowToast", () => ({
//   __esModule: true, // Add this line if useShowToast is not a default export
//   default: jest.fn(),
// }));
// jest.mock("firebase/firestore", () => ({
//   ...jest.requireActual("firebase/firestore"),
//   collection: jest.fn(),
//   getDocs: jest.fn(),
//   query: jest.fn(),
//   where: jest.fn(),
// }));

// describe("useSearchUser", () => {
//   it("should initialize with correct initial state", () => {
//     // Mock useState to return the initial state
//     jest.spyOn(require("react"), "useState").mockImplementationOnce(() => [false, null, jest.fn()]);

//     const { result } = renderHook(() => useSearchUser()); // Invoke the hook function
//     const { isLoading, getUserProfile, user, setUser } = result.current;

//     expect(isLoading).toBe(false);
//     expect(typeof getUserProfile).toBe("function");
//     expect(user).toBeNull();
//     expect(typeof setUser).toBe("function");
//   });

//   it("should handle getting user details successfully", async () => {
//     // Mock useState to return the initial state and update function
//     jest.spyOn(require("react"), "useState").mockImplementationOnce(() => [false, null, jest.fn()]);

//     // Mock necessary Firestore functions and data
//     const showToastMock = jest.fn();
//     jest.spyOn(require("../useShowToast"), "default").mockImplementationOnce(showToastMock);

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

//     const { result } = renderHook(() => useSearchUser());
//     const { getUserProfile } = result.current;

//     await act(async () => {
//       await getUserProfile("testUser");
//     });

//     expect(showToastMock).not.toHaveBeenCalledWith("Error", expect.any(String), "error");
//     expect(result.current.user).not.toBeNull();
//   });

//   it("should show an error toast if no users are found with the given username", async () => {
//     // Mock useState to return the initial state and update function
//     jest.spyOn(require("react"), "useState").mockImplementationOnce(() => [false, null, jest.fn()]);

//     // Mock necessary Firestore functions and data to simulate no users found
//     const showToastMock = jest.fn();
//     jest.spyOn(require("../useShowToast"), "default").mockImplementationOnce(showToastMock);

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

//     const { result } = renderHook(() => useSearchUser());
//     const { getUserProfile } = result.current;

//     await act(async () => {
//       await getUserProfile("nonexistentUser");
//     });

//     expect(showToastMock).toHaveBeenCalledWith("Error", "User not found", "error");
//     expect(result.current.user).toBeNull();
//   });

//   it("should show an error toast if an error occurs during the search process", async () => {
//     // Mock useState to return the initial state and update function
//     jest.spyOn(require("react"), "useState").mockImplementationOnce(() => [false, null, jest.fn()]);

//     // Mock necessary Firestore functions and data to simulate an error
//     const showToastMock = jest.fn();
//     jest.spyOn(require("../useShowToast"), "default").mockImplementationOnce(showToastMock);

//     const getDocsMock = jest.fn(() => Promise.reject(new Error("Test error")));
//     const whereMock = jest.fn();
//     const queryMock = jest.fn();

//     jest.spyOn(require("firebase/firestore"), "collection").mockImplementationOnce(jest.fn());
//     jest.spyOn(require("firebase/firestore"), "getDocs").mockImplementationOnce(getDocsMock);
//     jest.spyOn(require("firebase/firestore"), "query").mockImplementationOnce(queryMock);
//     jest.spyOn(require("firebase/firestore"), "where").mockImplementationOnce(whereMock);

//     const { result } = renderHook(() => useSearchUser());
//     const { getUserProfile } = result.current;

//     await act(async () => {
//       await getUserProfile("testUserWithError");
//     });

//     expect(showToastMock).toHaveBeenCalledWith("Error", "Test error", "error");
//     expect(result.current.user).toBeNull();
//   });
// });