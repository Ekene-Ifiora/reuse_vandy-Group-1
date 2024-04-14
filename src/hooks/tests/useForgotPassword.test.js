import { renderHook, act } from "@testing-library/react";
import useShowToast from "../useShowToast";
import { sendPasswordResetEmail } from "firebase/auth";
import useForgotPassword from "../useForgotPassword";

jest.mock('../useShowToast');
jest.mock('../../firebase/firebase');
jest.mock('firebase/auth');

sendPasswordResetEmail.mockResolvedValue({});

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

describe('useForgotPassword', () => {
    it('should work', async () => {
        const { result } = renderHook(() => useForgotPassword());
        const { forgotPass } = result.current;

        const inputs = { email: "johndoe@gmail.com" };

        await act(async () => {
            forgotPass(inputs, { preventDefault: () => { return true; }});
        });

        expect(e1).toBe("Info");
        expect(e2).toBe("Check email for password reset link");
        expect(e3).toBe("info");
    });

    it('should not work', async () => {
        const { result } = renderHook(() => useForgotPassword());
        const { forgotPass } = result.current;

        const inputs = { j: "j" };

        await act(async () => {
            forgotPass(inputs, "k");
        });

        expect(e1).toBe("Error");
        expect(e2).toBe("Please provide a valid email");
        expect(e3).toBe("error");
    });

    it('should not work again', async () => {
        const { result } = renderHook(() => useForgotPassword());
        const { forgotPass } = result.current;

        const inputs = { email: "johndoe@gmail.com" };

        await act(async () => {
            forgotPass(inputs, "e");
        });

        expect(e1).toBe("Error");
        expect(e2).toBe("e.preventDefault is not a function");
        expect(e3).toBe("error");
    });
});