import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: [], // current products on cart
    totalAmount: 0,
    status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed',
    error: null,
  },
  reducers: {
    setCartData: (state, action) => {
      state.data = action.payload;
    },
    setCartTotalAmount: (state, action) => {
      state.totalAmount = action.payload;
    },
    setCartItem: (state, action) => {
      const newProduct = {
        id: action.payload.id,
        amount: action.payload.newAmount,
        price: action.payload.price,
        product: action.payload.product,
      };
      state.data.push(newProduct);
    },
    deleteCartItem: (state, action) => {
      let i = state.data.map((item) => item.id).indexOf(action.payload); // find index of your object
      state.data.splice(i, 1);
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setCartData,
  setCartTotalAmount,
  setCartItem,
  deleteCartItem,
  setError,
  setStatus,
} = cartSlice.actions;

export default cartSlice.reducer;

export const loadCartData = () => (dispatch, getState) => {};

export const addItemToCar =
  (id, newAmount, price, product) => (dispatch, getState) => {
    const stateredux = getState();
    let newCartState = stateredux.cart.data;
    const itemInCart = newCartState.find((item) => item.id === id);
    if (itemInCart) {
      const result = newCartState.map((pr) =>
        pr.id === id ? { ...pr, amount: itemInCart.amount + newAmount } : pr
      );
      dispatch(setCartData(result));
    } else {
      dispatch(setCartItem({ id, newAmount, price, product }));
    }
    dispatch(updateCartTotalAmount());
    dispatch(saveCartStateOnStorage());
  };

export const updateCartTotalAmount = () => (dispatch, getState) => {
  const stateredux = getState();
  let newCartState = stateredux.cart.data;
  const values = newCartState.map((item) => item.amount * item.price);
  dispatch(
    setCartTotalAmount(
      Math.round(values.reduce((a, b) => a + b, 0) * 100) / 100
    )
  );
};

export const removeItemFromCart = (id) => (dispatch, getState) => {
  const stateredux = getState();
  let newCartState = stateredux.cart.data;
  let result;
  const itemInCart = newCartState.find((item) => item.id === id);

  if (itemInCart) {
    if (itemInCart.amount === 1) {
      dispatch(deleteCartItem(id));
    } else {
      result = newCartState.map((pr) =>
        pr.id === id ? { ...pr, amount: itemInCart.amount - 1 } : pr
      );
      dispatch(setCartData(result));
    }
    dispatch(updateCartTotalAmount());
    dispatch(saveCartStateOnStorage());
  }
};

const saveCartStateOnStorage = () => (dispatch, getState) => {
  console.log("saveCartStateOnStorage ");
  const stateredux = getState();
  const jsonState = JSON.stringify(stateredux.cart);
  try {
    AsyncStorage.setItem("CART_STATE", jsonState);
  } catch (e) {
    console.log("error at saveCartDataOnStorage: ", e);
  }
};

export const loadCartStateFromStorage = () => async (dispatch, getState) => {
  console.log("loadCartStateFromStorage ");
  try {
    const jsonValue = await AsyncStorage.getItem("CART_STATE");
    const savedState = jsonValue != null ? JSON.parse(jsonValue) : null;
    dispatch(setCartData(savedState.data));
    dispatch(setCartTotalAmount(savedState.totalAmount));
  } catch (e) {
    console.log("error at loadCartStateFromStorage: ", e);
  }
};

export const selectCartState = (state) => state.cart;

export const selectCartData = (state) => state.cart.data;

export const selectCartTotalAmount = (state) => state.cart.totalAmount;