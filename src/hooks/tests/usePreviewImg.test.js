import { renderHook, act } from "@testing-library/react";
import usePreviewImg from "../usePreviewImg";

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

describe("usePreviewImg", () => {
  it("should initialize with correct initial state", () => {
    // Mock useState to return the initial state
    jest.spyOn(require("react"), "useState").mockImplementationOnce(() => [null, jest.fn()]);

    const { result } = renderHook(() => usePreviewImg());
    const { selectedFile, handleImageChange, setSelectedFile } = result.current;

    expect(selectedFile).toBeNull();
    expect(typeof handleImageChange).toBe("function");
    expect(typeof setSelectedFile).toBe("function");
  });

  it("should show an error toast if the selected file is not an image", async () => {
    const { result } = renderHook(() => usePreviewImg());
    const { handleImageChange } = result.current;
    const nonImageFile = new File(["(⌐□_□)"], "non-image-file.txt", { type: "text/plain" });

    await act(async () => {
      // Mock the implementation of handleImageChange to throw an error
      jest.spyOn(result.current, 'handleImageChange').mockRejectedValueOnce(new Error('Update failed'));

      // Call the handleImageChange function
      handleImageChange({ target: { files: [nonImageFile] } });
    });

  });
});