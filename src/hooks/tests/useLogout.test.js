// // Import necessary dependencies and hooks for testing
// import { renderHook, act } from "@testing-library/react";
// import { useLogout } from "../useLogout"; // Make sure to update the import path

// // Mock necessary dependencies
// jest.mock("react-firebase-hooks/auth", () => ({
//   useSignOut: jest.fn(() => [jest.fn(), false, null]),
// }));
// jest.mock("../../store/authStore", () => ({
//   useAuthStore: jest.fn(() => ({
//     logout: jest.fn(),
//   })),
// }));
// jest.mock("../useShowToast", () => jest.fn());
// jest.mock("../../firebase/firebase", () => ({
//   auth: {},
// }));

// describe("useLogout", () => {
//   it("should initialize with correct initial state", () => {
//     const { result } = renderHook(() => useLogout());
//     const { handleLogout, isLoggingOut, error } = result.current;

//     expect(typeof handleLogout).toBe("function");
//     expect(isLoggingOut).toBe(false);
//     expect(error).toBe(null);
//   });

//   it("should handle logout successfully", async () => {
//     const { result, waitForNextUpdate } = renderHook(() => useLogout());
//     const { handleLogout, isLoggingOut, error } = result.current;

//     await act(async () => {
//       await handleLogout();
//       await waitForNextUpdate();
//     });

//     // Add assertions here based on the expected behavior after successful logout
//     expect(isLoggingOut).toBe(false);
//     expect(error).toBe(null);
//     expect(useAuthStore().logout).toHaveBeenCalled();
//   });

//   it("should handle errors during logout process", async () => {
//     const errorMessage = "Logout error";
//     // Mock the useSignOut hook to throw an error
//     jest.spyOn(require("react-firebase-hooks/auth"), "useSignOut").mockImplementationOnce(() => [jest.fn(() => Promise.reject(new Error(errorMessage))), false, null]);

//     const { result, waitForNextUpdate } = renderHook(() => useLogout);
//     const { handleLogout, isLoggingOut, error } = result.current;

//     await act(async () => {
//       await handleLogout();
//       await waitForNextUpdate();
//     });

//     // Add assertions here based on the expected behavior after an error during logout
//     expect(isLoggingOut).toBe(false);
//     expect(error).toEqual(new Error(errorMessage));
//     expect(useShowToast).toHaveBeenCalled(); // Assuming useShowToast is called in case of an error
//   });
// });