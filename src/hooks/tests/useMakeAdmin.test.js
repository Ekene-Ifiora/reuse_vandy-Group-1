import { renderHook, act } from '@testing-library/react';
import useShowToast from "../useShowToast";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import useMakeAdmin from "../useMakeAdmin";

jest.mock('../useShowToast');
jest.mock('firebase/firestore');

getFirestore.mockResolvedValue({});
doc.mockResolvedValue({});
updateDoc.mockResolvedValue({});

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

describe('useMakeAdmin', () => {
    it('make works', async () => {
        const { result } = renderHook(() => useMakeAdmin());
        const { makeAdmin } = result.current;

        const user = { username: "j", uid: 5 };

        await act(async () => {
            makeAdmin(user);
        });

        expect(e1).toBe("Info");
        expect(e2).toBe("j was not made an Admin");
        expect(e3).toBe("info");
    });

    it('delete works', async () => {
        const { result } = renderHook(() => useMakeAdmin());
        const { unmakeAdmin } = result.current;

        const user = { username: "j", uid: 5 };
        
        await act(async () => {
            unmakeAdmin(user);
        });

        expect(e1).toBe("Info");
        expect(e2).toBe("j is still an Admin");
        expect(e3).toBe("info");
    });
});