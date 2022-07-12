import { createSlice } from "@reduxjs/toolkit";
import { Alert } from "react-native";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    data: null,
    page: 1,
    pages: 1000000,
    rowsPerPage: 10,
    total: 10000000,
    status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed',
    error: null,
  },
  reducers: {
    setProductsData: (state, action) => {
      state.data = action.payload;
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
export const { setProductsData, setError, setStatus } = productsSlice.actions;

export default productsSlice.reducer;

export const fetchProducts = () => (dispatch, getState) => {
  dispatch(setStatus("loading"));
  console.log("Busca productos a https://api.koibanx.com/stores");
  fetch("https://fakestoreapi.com/products/?limit=20")
    .then((res) => res.json())
    .then((json) => {
      const products = json.map((p) => {
        return {
          name: p.title,
          price: p.price,
          stock: !(p.id % 2) ? 0 : Math.floor(Math.random() * 10 + 1), //si el id es par asignamos stock 0
          id: p.id,
          image: p.image,
        };
      });
      dispatch(setProductsData(products));
      dispatch(setStatus("succeeded"));
    })
    .catch((e) => {
      dispatch(setStatus("error"));
      Alert.alert(
        "Aviso",
        "Error al buscar productos. Verifique su Conexion a Internet."
      );
    });
};

export const selectAllProducts = (state) => state.products.data;