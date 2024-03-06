import { describe, expect, test } from 'vitest';
import { fireEvent, render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Test from '../src/components/AuthForm/test';
import Login from '../src/components/AuthForm/Login';

describe('Test React Works', () => {
    test('render app', () => {
        render(<Test/>);
        const linkElement = screen.getByText(/test stuff/i)
        expect(linkElement).toBeDefined();
    });
});

describe('Login Screen Tests', () => {

    test('login start', () => {
        render(<Login/>);
        const signInElements = screen.getAllByText(/Sign in/i);
        signInElements.forEach((element) => {
            expect(element).toBeDefined();
        });

        const forgotPassword = screen.getByText(/forgot your password/i);
        expect(forgotPassword).toBeDefined();
    });

    test('changes', async () => {
        render(<Login/>);
        const password = screen.getByPlaceholderText(/password/i);

        act(() => {
            fireEvent.change(password, { target: { value: 'newPassword123' } });
            expect(password.value).toBe('newPassword123');

            const email = screen.getByPlaceholderText(/email/i);
            fireEvent.change(email, { target: { value: '@gm' } });
            expect(email.value).toBe('@gm');
        });
    });

    test('hit enter bad', async () => {
        render(<Login/>);
        const password = screen.getByPlaceholderText(/password/i);
        expect(password).toBeDefined();

        await act(async () => {
            fireEvent.change(password, { target: { value: 'wrong' } });

            const email = screen.getByPlaceholderText(/email/i);
            fireEvent.change(email, { target: { value: 'johndoe@gmail.co' } });
    
            const button = screen.getByRole('button', { name: /Sign In/i });
            expect(button).toBeDefined();
    
            userEvent.click(button);
    
            const error = screen.findByText(/Firebase:/i);
            expect(error).toBeDefined();
        });
    });

    test('hit enter good', async () => {
        render(<Login/>);
        const password = screen.getByPlaceholderText(/password/i);
        expect(password).toBeDefined();
        const button = screen.getByRole('button', { name: /Sign In/i });
      
        act(() => {
            fireEvent.change(password, { target: { value: 'Password' } });
      
            const email = screen.getByPlaceholderText(/email/i);
            fireEvent.change(email, { target: { value: 'johndoe@gmail.com' } });

            expect(button).toBeDefined();
            expect(button).toBeInTheDocument();

            const error = screen.queryByText(/Firebase:/i);
            expect(error).not.toBeInTheDocument();

            fireEvent.click(button);

            const error2 = screen.queryByText(/Firebase:/i);
            expect(error2).not.toBeInTheDocument();
        });
    });
});
