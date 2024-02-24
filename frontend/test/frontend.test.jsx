import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Test from '../src/components/AuthForm/test'

describe('React frontend tests', () => {
    test('render app', () => {
        render(<Test/>);
        const linkElement = screen.getByText(/test stuff/i)
        expect(linkElement).toBeDefined();
    });
});
