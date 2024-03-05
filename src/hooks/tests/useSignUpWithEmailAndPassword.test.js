// import { renderHook, act } from "@testing-library/react";
// import { useSignUpWithEmailAndPassword } from "../useSignUpWithEmailAndPassword";
// import {
//   useCreateUserWithEmailAndPassword as firebaseUseCreateUserWithEmailAndPassword,
//   AuthError as FirebaseAuthError,
// } from "react-firebase-hooks/auth";
// import { auth, firestore } from "../../firebase/firebase";
// import { setDoc as firestoreSetDoc } from "firebase/firestore";
// import useShowToast from "../useShowToast";
// import useAuthStore from "../../store/authStore";

// jest.mock("react-firebase-hooks/auth", () => ({
//   useCreateUserWithEmailAndPassword: jest.fn(),
// }));

// jest.mock("../../firebase/firebase", () => ({
//   auth: {
//     ...jest.requireActual("../../firebase/firebase").auth,
//     createUserWithEmailAndPassword: jest.fn(),
//   },
//   firestore: {
//     ...jest.requireActual("../../firebase/firebase").firestore,
//     setDoc: jest.fn(),
//   },
// }));

// jest.mock("../useShowToast", () => ({
//   __esModule: true,
//   default: jest.fn(),
// }));

// jest.mock("../../store/authStore", () => ({
//   __esModule: true,
//   default: {
//     login: jest.fn(),
//   },
// }));

// describe("useSignUpWithEmailAndPassword", () => {
//   const mockInputs = {
//     email: "test@example.com",
//     password: "testpassword",
//     username: "testuser",
//     fullName: "Test User",
//   };

//   const mockUser = {
//     uid: "mockuid",
//     email: mockInputs.email,
//     username: mockInputs.username,
//     fullName: mockInputs.fullName,
//   };

//   it("should show an error toast when signup fails", async () => {
//     const errorMock = FirebaseAuthError;
//     const createUserWithEmailAndPasswordMock = jest.fn(() => ({
//       user: null,
//       error: errorMock,
//     }));
//     firebaseUseCreateUserWithEmailAndPassword.mockReturnValue([
//       createUserWithEmailAndPasswordMock,
//       null,
//       false,
//       errorMock,
//     ]);

//     const showToastMock = jest.fn();
//     useShowToast.mockImplementation(showToastMock);

//     const { result } = renderHook(() => useSignUpWithEmailAndPassword);

//     await act(async () => {
//       if (result.current.signup) { // Check if signup function is defined
//         await result.current.signup(mockInputs);
//       }
//     });

//     expect(createUserWithEmailAndPasswordMock).toHaveBeenCalledWith(
//       mockInputs.email,
//       mockInputs.password
//     );

//     expect(showToastMock).toHaveBeenCalledWith("Error", errorMock.message, "error");
//   });
// });