import { renderHook, act, waitFor } from "@testing-library/react";
import useShowToast from "../useShowToast";
import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";

jest.mock('react-firebase-hooks/auth');
jest.mock('../../store/authStore');
jest.mock('@chakra-ui/react');
jest.mock('firebase/firestore');

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useCallback: jest.fn()
}));

useCallback.mockImplementation((fn) => { return fn; });

var title1 = null;
var description1 = null;
var status1 = null;
var duration1 = 1;
var isClosable1 = false;

const toast = ({title, description, status, duration, isCloasable}) => {
  title1 = title;
  description1 = description;
  status1 = status;
  duration1 = duration;
  isClosable1 = isCloasable;
}

useToast.mockImplementation(() => {
  return toast;
});

// useCallback.mockReturnValue(toast);

describe("useShowToast", () => {
  it("should initialize with correct initial state", () => {
    const { result } = renderHook(() => useShowToast);
    const showToast = result.current;

    expect(typeof showToast).toBe("function");
  });

  it('should create correct toast', async () => {
    const { result } = renderHook(() => useShowToast);
    const showToast = result.current;

    var title2 = 'x';
    var description2 = 'y';
    var status2 = 'z';

    act(() => {
      showToast(title2, description2, status2);
    });

    waitFor(() => {
      expect(title1).toBe(title2);
      expect(description1).toBe(description2);
      expect(status1).toBe(status2);
      expect(duration1).toBe(3000);
      expect(isClosable1).toBe(true);
    });
  });

});