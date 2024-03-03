import { describe, expect, test } from 'vitest'
import { fireEvent, render, screen, act } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import '@testing-library/jest-dom';
import Signup from '../src/components/AuthForm/Signup';

describe('SignUp Tests', () => {

    test(('sign up start'), () => {
        render(<Signup/>);
        const password = screen.getByPlaceholderText(/password/i);
        expect(password).toBeDefined();

        act(() => {
            fireEvent.change(password, { target: { value: 's' } });
            expect(password.value).toBe('s');
        });
    });

    // test('signup bad', async () => {
    //     render(<Signup/>);
    //     const password = screen.getByPlaceholderText(/password/i);
    //     expect(password).toBeDefined();

    //     const full = screen.getByPlaceholderText(/full name/i);
    //     expect(full).toBeDefined();

    //     const email = screen.getByPlaceholderText(/email/i);
    //     expect(email).toBeDefined();

    //     const username = screen.getByPlaceholderText(/username/i);
    //     expect(username).toBeDefined();

    //     await act(async () => {
    //         fireEvent.change(password, { target: { value: 's' } });
    //         expect(password.value).toBe('s');

    //         fireEvent.change(email, { target: { value: 'johndoe@gmail.com' } });
    //         expect(email.value).toBe('johndoe@gmail.com');

    //         fireEvent.change(username, { target: { value: 'no one' } });
    //         expect(username.value).toBe('no one');

    //         fireEvent.change(full, { target: { value: 'no one' } });
    //         expect(full.value).toBe('no one');

    //         const button = screen.getByRole('button', { name: /Sign Up/i });
    //         expect(button).toBeDefined();
    //         await userEvent.click(button);

    //         // add test for what happens after
    //     });
    // });
});