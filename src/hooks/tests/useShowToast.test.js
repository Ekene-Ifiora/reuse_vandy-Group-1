// import { renderHook } from "@testing-library/react";
// import { useShowToast } from "../useShowToast"; // Update the import path
// import { useToast as chakraUseToast } from "@chakra-ui/react";

// // Mock necessary dependencies
// jest.mock("@chakra-ui/react", () => ({
//   useToast: jest.fn(),
// }));

// describe("useShowToast", () => {
//   it("should initialize with correct initial state", () => {
//     // Mock the useToast function from Chakra UI
//     const chakraToastMock = jest.fn();
//     chakraUseToast.mockImplementation(chakraToastMock);

//     const { result } = renderHook(() => useShowToast);
//     const showToast = result.current;

//     expect(typeof showToast).toBe("function");

//     // Test if the useToast function is called with the correct parameters
//     showToast("Test Title", "Test Description", "success");
//     expect(chakraToastMock).toHaveBeenCalledWith({
//       title: "Test Title",
//       description: "Test Description",
//       status: "success",
//       duration: 3000,
//       isClosable: true,
//     });
//   });

//   it("should memoize the showToast function using useCallback", () => {
//     // Mock the useToast function from Chakra UI
//     const chakraToastMock = jest.fn();
//     chakraUseToast.mockImplementation(chakraToastMock);

//     const { result, rerender } = renderHook(() => useShowToast);
//     const initialShowToast = result.current;

//     // Render the hook with the same dependencies
//     rerender();

//     // Check if the function is the same instance after re-render
//     expect(result.current).toBe(initialShowToast);
//   });
// });