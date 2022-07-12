import React from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import {
  selectCartData,
  selectCartTotalAmount,
} from "../../Reducer/Slices/cartSlice";
import { styles } from "./styles";

export default ({}) => {
  const cartData = useSelector(selectCartData);
  const totalAmount = useSelector(selectCartTotalAmount);
 
  return (
    <View style={styles.footerInfoContainer}>
      <View>
        <Text style={styles.footerInfoText}>
          Articulos:{" "}
          {cartData.map((item) => item.amount).reduce((a, b) => a + b, 0)}{" "}
        </Text>
      </View>
      <View>
        <Text style={styles.footerInfoText}>Total: ${totalAmount}</Text>
      </View>
    </View>
  );
};