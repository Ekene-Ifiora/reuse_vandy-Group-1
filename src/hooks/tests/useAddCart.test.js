// useAddCart.test.js
import { renderHook, act } from '@testing-library/react';
import useAddCart from '../useAddCart';
import useAuthStore from "../../store/authStore";
import { arrayUnion, doc, updateDoc, getDoc } from "firebase/firestore";
import { collection, getDocs, query, where } from "firebase/firestore";
import useShowToast from "../useShowToast";
import { ConstructionOutlined } from '@mui/icons-material';

jest.mock('firebase/firestore');
jest.mock('../../store/authStore');
jest.mock('../../firebase/firebase');
jest.mock('../useShowToast')

query.mockResolvedValue({});
getDocs.mockResolvedValue({});
getDoc.mockResolvedValue({});
where.mockResolvedValue({});
collection.mockResolvedValue({});
arrayUnion.mockResolvedValue({});
doc.mockResolvedValue({});
updateDoc.mockResolvedValue({});
useAuthStore.mockResolvedValue({});

var e1;
var e2;
var e3;
useShowToast.mockImplementation(() => {const showToast = (error1, error2, error3) => {e1 = error1; e2 = error2; e3 = error3;}
                                      return showToast;});

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

  it('should add to cart with post', async () => {
    const { result } = renderHook(() => useAddCart());
    const { handleAddCart } = result.current;

    await act(async () => {
      var spy = jest.spyOn(result.current, 'handleAddCart');
      getDocs.mockResolvedValue([{ id: 1 }, { id: 2 }]);

      const data = () => {
        return { cart: [1] }
      };

      getDoc.mockResolvedValue({data});

      const post = { id: 1 };
      await handleAddCart(post);

      expect(e1).toBe('Info');
      expect(e2).toBe("Item already exists in the cart");
      expect(e3).toBe("info");
    })

    expect(result.current.isUpdating).toBe(false);
  });
});