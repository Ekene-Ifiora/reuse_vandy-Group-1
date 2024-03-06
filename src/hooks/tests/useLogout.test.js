// Import necessary dependencies and hooks for testing
import { renderHook, act } from "@testing-library/react";
import useLogout from "../useLogout";

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

describe("useLogout", () => {
  it("should initialize with correct initial state", () => {
    const { result } = renderHook(() => useLogout());
    const { handleLogout, isLoggingOut, error } = result.current;

    expect(typeof handleLogout).toBe("function");
    expect(isLoggingOut).toBe(false);
    expect(error).toBeUndefined();
  });
});