import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";
import axios from "axios";
const url = "https://course-api.com/react-useReducer-cart-projects";
export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (name, thunkApi) => {
    try {
      const response = await axios(url);

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue("something went wrong fetching");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [
      /* cartItems */
    ],
    amount: 4,
    total: 0,
    isLoading: false,
    hasError: null,
  },
  reducers: {
    clearCart(state) {
      state.cartItems = [];

      //kan returnera också, men då måste du kopiera alla keys
      //annars försvinner de nör du uppdaterar statet.
      //return {}
    },
    removeItem(state, action) {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },

    toggleAmount(state, action) {
      const cartItem = state.cartItems.find(
        (item) => item.id == action.payload.id
      );

      if (action.payload.option == "INCREASE") {
        cartItem.amount = cartItem.amount + 1;
      } else if (action.payload.option == "DECREASE") {
        cartItem.amount = cartItem.amount - 1;
      }
    },
    calculateTotals(state, action) {
      let amount = 0;
      let total = 0;

      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });

      state.amount = amount;
      state.total = total.toFixed(2);
    },

    /*   decrease(state, action) {
      const cartItem = state.cartItems.find(
        (item) => item.id == action.payload
      );
      cartItem.amount = cartItem.amount - 1;
    }, */
  },
  //create asyncThunk
  extraReducers: {
    [getCartItems.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      state.isLoading = false;
      //action.payload kmr hålla jsonresponset
      console.log(action.payload);
      state.cartItems = action.payload;
    },
    [getCartItems.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = action.payload;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
