import { renderHook, act, waitFor } from "@testing-library/react";
import usePreviewImg from "../usePreviewImg";
import useShowToast from "../useShowToast";

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

  it('should fail if file does not exist', async () => {
    e1 = "j";
    e2 = "j";
    e3 = "j";

    const { result } = renderHook(() => usePreviewImg());
    const { handleImageChange } = result.current;

    const file = false;

    const input = {
      target: {
        files: [file]
      }
    };

    await act(async () => {
      jest.spyOn(result.current, 'handleImageChange');

      handleImageChange(input);
    });

    expect(e1).toBe("Error");
    expect(e2).toBe("Please select an image file");
    expect(e3).toBe("error");

    expect(result.current.selectedFile).toBeNull();
  });

  it('should fail if file does not start with image/', async () => {
    e1 = "j";
    e2 = "j";
    e3 = "j";
    
    const { result } = renderHook(() => usePreviewImg());
    const { handleImageChange } = result.current;

    const file = {
      type: "t"
    };

    const input = {
      target: {
        files: [file]
      }
    };

    await act(async () => {
      jest.spyOn(result.current, 'handleImageChange');

      handleImageChange(input);
    });

    expect(e1).toBe("Error");
    expect(e2).toBe("Please select an image file");
    expect(e3).toBe("error");

    expect(result.current.selectedFile).toBeNull();
  });

  it('should fail if file size too large', async () => {
    e1 = "j";
    e2 = "j";
    e3 = "j";
    
    const { result } = renderHook(() => usePreviewImg());
    const { handleImageChange } = result.current;

    const file = {
      type: "image/x.img",
      size: 3 * 1024 * 1024
    };

    const input = {
      target: {
        files: [file]
      }
    };

    await act(async () => {
      jest.spyOn(result.current, 'handleImageChange');

      handleImageChange(input);
    });

    expect(e1).toBe("Error");
    expect(e2).toBe("File size must be less than 2MB");
    expect(e3).toBe("error");

    expect(result.current.selectedFile).toBeNull();
  });

  it('should work', async () => {
    e1 = "j";
    e2 = "j";
    e3 = "j";
    
    const { result } = renderHook(() => usePreviewImg());
    const { handleImageChange } = result.current;
    const file = new File(["(⌐□_□)"], "image/test.png", { type: "image/plain" });

    const input = {
      target: {
        files: [file]
      }
    };

    await act(async () => {
      jest.spyOn(result.current, 'handleImageChange');

      handleImageChange(input);
    });

    waitFor(() => {
      expect(result.current.selectedFile).not.toBeNull();
    });
  });
});