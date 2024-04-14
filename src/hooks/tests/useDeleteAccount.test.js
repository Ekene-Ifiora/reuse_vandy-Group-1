import { renderHook, act } from "@testing-library/react";
import useShowToast from "../useShowToast";
import { firestore, auth } from "../../firebase/firebase";
import {
  getDocs,
  collection,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import useDeleteAccount from "../useDeleteAccount.js";

jest.mock('../../firebase/firebase');
jest.mock('firebase/firestore');
jest.mock('react-router-dom');
jest.mock('../useShowToast');
jest.mock('../../firebase/firebase');

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

useNavigate.mockResolvedValue(() => {
    return (_) => { return true; }; 
});

where.mockResolvedValue({});
collection.mockResolvedValue({});
query.mockResolvedValue({});
getDocs.mockResolvedValue({});
doc.mockResolvedValue({});
deleteDoc.mockResolvedValue({});

describe('useDeleteAccount', () => {
    // let windowSpy;

    // beforeEach(() => {
    //     windowSpy = jest.spyOn(window, "window", "get");
    // });

    // afterEach(() => {
    //     windowSpy.mockRestore();
    // });

    // it('should work if no snapshot', async () => {
    //     windowSpy.mockResolvedValue({ confirm: () => {return true}});
    //     const { result } = renderHook(() => useDeleteAccount());
    //     const { deleteAccount } = result.current;

    //     const user = { fullName: "n", uid: 5 };
    //     const e = { preventDefault: () => { return true; } };

    //     await act(async () => {
    //         deleteAccount(user, e);
    //     });

    //     expect(e1).toBe("Success");
    //     expect(e2).toBe("Successfully deleted n's account and associated posts");
    //     expect(e3).toBe("success");
    // });

    // it('should work if snapshot', async () => {
    //     windowSpy.mockResolvedValue({ confirm: () => {return true}});
    //     const { result } = renderHook(() => useDeleteAccount());
    //     const { deleteAccount } = result.current;

    //     const user = { fullName: "a", uid: 5 };
    //     const e = { preventDefault: () => { return true; } };

    //     getDocs.mockResolvedValueOnce([{ref: 'j'}])

    //     await act(async () => {
    //         deleteAccount(user, e);
    //     });

    //     expect(e1).toBe("Success");
    //     expect(e2).toBe("Successfully deleted a's account and associated posts");
    //     expect(e3).toBe("success");
    // });

    // it('should work if unknown error', async () => {
    //     windowSpy.mockResolvedValue({ confirm: () => {return true}});
    //     const { result } = renderHook(() => useDeleteAccount());
    //     const { deleteAccount } = result.current;

    //     const user = { fullName: "a" };
    //     const e = { preventDefault: () => { return true; } };

    //     getDocs.mockResolvedValueOnce([{refddd: 'j'}])

    //     await act(async () => {
    //         deleteAccount(user, e);
    //     });

    //     expect(e1).toBe("Error");
    //     expect(e2).toBe("Failed to delete a's account: ")
    //     expect(e3).toBe("error");
    // });

    it('should not have window confirm', async () => {
        const { result } = renderHook(() => useDeleteAccount());
        const { deleteAccount } = result.current;

        const user = { fullName: "n", uid: 5 };
        const e = { preventDefault: () => { return true; } };

        await act(async () => {
            deleteAccount(user, e);
        });

        expect(e1).toBe("Info");
        expect(e2).toBe("n's account was not deleted");
        expect(e3).toBe("info");
    });
});