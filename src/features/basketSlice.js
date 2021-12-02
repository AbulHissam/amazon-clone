import { createSlice } from "@reduxjs/toolkit";

export const basketSlice = createSlice({
  // Create a slice named basked with initialState and reducers
  name: "basket",
  initialState: {
    basket: [],
  },
  reducers: {
    addToBasket: (state, action) => {
      state.basket = [...state.basket, action.payload];
    },
    removeFromBasket: (state, action) => {
      // Find the index of the item in the basket and splice  it from the current basket
      // findIndex will return the index of the first item that matches the condition if none found returns -1
      const index = state.basket.findIndex((basketItem) => {
        return basketItem.id === action.payload.id;
      });
      if (index >= 0) {
        state.basket.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.payload.id}) as its not in basket!`
        );
      }
    },
  },
});

// Action creators
export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Select baset from basket slice basket
export const basketSelector = (state) => state.basket.basket;

export default basketSlice.reducer;
