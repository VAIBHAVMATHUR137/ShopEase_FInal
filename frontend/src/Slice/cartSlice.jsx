import { createSlice } from '@reduxjs/toolkit';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('cart');
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return [];
  }
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: loadState(),
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      const index = state.findIndex(item => item.id === action.payload);
      if (index !== -1) {
        if (state[index].quantity > 1) {
          state[index].quantity -= 1;
        } else {
          state.splice(index, 1);
        }
      }
    },
    resetItem: () => {
      return [];
    },
    updateItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const index = state.findIndex(item => item.id === id);
      if (index !== -1) {
        if (quantity > 0) {
          state[index].quantity = quantity;
        } else {
          state.splice(index, 1);
        }
      }
    },
  },
});

export const { addItem, removeItem, resetItem, updateItemQuantity } = cartSlice.actions;

export default cartSlice.reducer;