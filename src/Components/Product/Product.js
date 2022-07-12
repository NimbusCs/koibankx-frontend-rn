import React, { useState, useEffect } from "react";
import {  
  View,  
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import { Card, Title } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartData,
  addItemToCar,
  removeItemFromCart,
} from "../../Reducer/Slices/cartSlice";
import { styles } from "./styles";

export default ({ product, cartView, ...props }) => {
  const [selectedAmount, setSelectedAmount] = useState(1);
  const [itemCart, setItemCart] = useState(null);
  const cartData = useSelector(selectCartData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (cartView && product) {
      const itemInCart = cartData.find((i) => product.id === i.id);
      if (itemInCart) {
        setItemCart(itemInCart);
        setSelectedAmount(itemInCart.amount);
      }
    }
  }, [cartData]);

  const handleAddToCart = (id, selectedAmount, price, product) => {
    if (selectedAmount <= product.stock) {
      const itemInCart = cartData.find((cartItem) => cartItem.id === id);
      if (itemInCart && itemInCart.amount + selectedAmount > product.stock) {
        Alert.alert(
          "",
          "NO HAY SUFICIENTE STOCK DE ESTE PRODUCTO PARA AGREGAR A TU CARRITO!"
        );
      } else {
        dispatch(addItemToCar(id, selectedAmount, parseFloat(price), product));
        setSelectedAmount(1);
        Alert.alert("", "Producto agregado exitosamente al carrito!");
      }
    }
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeItemFromCart(id));
  };

  return (
    <View style={styles.productContainer}>
      {product && (
        <>
          <Card>
            <Card.Cover source={{ uri: product.image }} />
            <Card.Content>
              <View style={styles.productTitleContainer}>
                <Title style={styles.productTitleText}>{product.name}</Title>
                <Title style={styles.productPriceText}>
                  ${parseFloat(product.price) * selectedAmount}
                </Title>
              </View>
            </Card.Content>

            <View style={styles.productActions}>
              {product.stock > 0 && (
                <TouchableOpacity
                  style={styles.addCartAction}
                  onPress={() =>
                    cartView
                      ? handleRemoveFromCart(product.id)
                      : handleAddToCart(
                          product.id,
                          selectedAmount,
                          product.price,
                          product
                        )
                  }
                >
                  <MaterialCommunityIcons
                    name={cartView ? "cart-arrow-up" : "cart-arrow-down"}
                    size={30}
                    color={cartView ? "red" : "blue"}
                  />
                  <Text
                    style={[
                      styles.addCartText,
                      { color: cartView ? "red" : "blue" },
                    ]}
                  >
                    {cartView ? "Remove from cart" : "Add to cart"}
                  </Text>
                </TouchableOpacity>
              )}
              {product.stock > 0 && !cartView && (
                <Title style={styles.productStockText}>
                  (stock: {product.stock})
                </Title>
              )}
              {product.stock > 0 && !cartView && (
                <View style={styles.amountSelectorContainer}>
                  <TouchableOpacity
                    style={styles.productAmountSelector}
                    onPress={() =>
                      setSelectedAmount(
                        selectedAmount === 1 ? 1 : selectedAmount - 1
                      )
                    }
                  >
                    <MaterialCommunityIcons
                      name={"minus"}
                      size={20}
                      color={"blue"}
                    />
                  </TouchableOpacity>
                  <Text style={styles.setSelectedAmountText}>
                    {selectedAmount}
                  </Text>
                  <TouchableOpacity
                    style={styles.productAmountSelector}
                    onPress={() =>
                      setSelectedAmount(
                        selectedAmount === product.stock
                          ? product.stock
                          : selectedAmount + 1
                      )
                    }
                  >
                    <MaterialCommunityIcons
                      name={"plus"}
                      size={20}
                      color={"blue"}
                    />
                  </TouchableOpacity>
                </View>
              )}
              {cartView && itemCart && (
                <Title style={[styles.productStockText, styles.inCartText]}>
                  (in cart: {itemCart.amount})
                </Title>
              )}
            </View>
          </Card>
        </>
      )}
    </View>
  );
};
