// import { renderHook, act } from "@testing-library/react";
// import { usePreviewImg } from "../usePreviewImg"; // Update the import path

// // Mock necessary dependencies
// jest.mock("react", () => ({
//   ...jest.requireActual("react"),
//   useState: jest.fn(),
// }));
// jest.mock("../useShowToast", () => jest.fn());

// describe("usePreviewImg", () => {
//   it("should initialize with correct initial state", () => {
//     // Mock useState to return the initial state
//     jest.spyOn(require("react"), "useState").mockImplementationOnce(() => [null, jest.fn()]);

//     const { result } = renderHook(() => usePreviewImg());
//     const { selectedFile, handleImageChange, setSelectedFile } = result.current;

//     expect(selectedFile).toBeNull();
//     expect(typeof handleImageChange).toBe("function");
//     expect(typeof setSelectedFile).toBe("function");
//   });

//   it("should handle image change successfully", async () => {
//     // Mock useState to return the initial state and update function
//     jest.spyOn(require("react"), "useState").mockImplementationOnce(() => [null, jest.fn()]);

//     // Mock necessary functions and data
//     const showToastMock = jest.fn();
//     jest.spyOn(require("../useShowToast"), "default").mockImplementationOnce(() => showToastMock);

//     const { result } = renderHook(() => usePreviewImg());
//     const { handleImageChange } = result.current;

//     const testImageFile = new File(["(⌐□_□)"], "test-image.png", { type: "image/png" });

//     await act(async () => {
//       await handleImageChange({ target: { files: [testImageFile] } });
//     });

//     expect(showToastMock).not.toHaveBeenCalledWith("Error", expect.any(String), "error");
//     expect(result.current.selectedFile).not.toBeNull();
//   });

//   it("should show an error toast if the file size exceeds the limit", async () => {
//     // Mock useState to return the initial state and update function
//     jest.spyOn(require("react"), "useState").mockImplementationOnce(() => [null, jest.fn()]);

//     // Mock necessary functions and data to simulate exceeding the file size limit
//     const showToastMock = jest.fn();
//     jest.spyOn(require("../useShowToast"), "default").mockImplementationOnce(() => showToastMock);

//     const { result } = renderHook(() => usePreviewImg());
//     const { handleImageChange } = result.current;

//     const oversizedImageFile = new File(["(⌐□_□)"], "oversized-image.png", { type: "image/png", size: 3 * 1024 * 1024 });

//     await act(async () => {
//       await handleImageChange({ target: { files: [oversizedImageFile] } });
//     });

//     expect(showToastMock).toHaveBeenCalledWith("Error", "File size must be less than 2MB", "error");
//     expect(result.current.selectedFile).toBeNull();
//   });

//   it("should show an error toast if the selected file is not an image", async () => {
//     // Mock useState to return the initial state and update function
//     jest.spyOn(require("react"), "useState").mockImplementationOnce(() => [null, jest.fn()]);

//     // Mock necessary functions and data to simulate selecting a non-image file
//     const showToastMock = jest.fn();
//     jest.spyOn(require("../useShowToast"), "default").mockImplementationOnce(() => showToastMock);

//     const { result } = renderHook(() => usePreviewImg());
//     const { handleImageChange } = result.current;

//     const nonImageFile = new File(["(⌐□_□)"], "non-image-file.txt", { type: "text/plain" });

//     await act(async () => {
//       await handleImageChange({ target: { files: [nonImageFile] } });
//     });

//     expect(showToastMock).toHaveBeenCalledWith("Error", "Please select an image file", "error");
//     expect(result.current.selectedFile).toBeNull();
//   });

// });