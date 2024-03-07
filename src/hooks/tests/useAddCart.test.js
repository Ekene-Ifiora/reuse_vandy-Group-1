// useAddCart.test.js
import { renderHook, act } from '@testing-library/react';
import useAddCart from '../useAddCart';

describe('useAddCart', () => {
  it('should initialize with isUpdating set to false', () => {
    const { result } = renderHook(() => useAddCart());
    expect(result.current.isUpdating).toBe(false);
  });

  it('should add to cart successfully', async () => {
    const { result } = renderHook(() => useAddCart());
    const { handleAddCart } = result.current;

    await act(async () => {
      // Mock the implementation of handleAddCart for successful update
      jest.spyOn(result.current, 'handleAddCart').mockResolvedValueOnce();

      // Call the handleAddCart function
      await handleAddCart();
    });

    // After the update, isUpdating should be set to false
    expect(result.current.isUpdating).toBe(false);
  });

  it('should handle errors during add to cart', async () => {
    const { result } = renderHook(() => useAddCart());
    const { handleAddCart } = result.current;

    await act(async () => {
      // Mock the implementation of handleAddCart to throw an error
      jest.spyOn(result.current, 'handleAddCart').mockRejectedValueOnce(new Error('Update failed'));

      // Call the handleAddCart function
      await handleAddCart();
    });

    // After the error, isUpdating should be set to false
    expect(result.current.isUpdating).toBe(false);
  });
});