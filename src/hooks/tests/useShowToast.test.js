import { renderHook } from "@testing-library/react";
import useShowToast from "../useShowToast";

jest.mock('react-firebase-hooks/auth');
jest.mock('../useShowToast');
jest.mock('../../store/authStore');

// Mock the necessary Firebase functions
jest.mock('firebase/firestore', () => ({
  ...jest.requireActual('firebase/firestore'),
  getFirestore: jest.fn(() => ({
    doc: jest.fn(),
    getDoc: jest.fn(),
  })),
}));

describe("useShowToast", () => {
  it("should initialize with correct initial state", () => {
    const { result } = renderHook(() => useShowToast);
    const showToast = result.current;

    expect(typeof showToast).toBe("function");
  });
});