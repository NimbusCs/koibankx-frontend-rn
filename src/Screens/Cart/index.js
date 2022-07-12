import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { styles } from "./styles";
import Product from "../../Components/Product/Product";
import { selectCartData } from "../../Reducer/Slices/cartSlice";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import ModalFilter from "../../Components/Modal/ModalFilter";
import FooterCartInfo from "../../Components/Footer/FooterCartInfo";

export default CartScreen = ({}) => {
  const [currentCartItems, setCurrentCartItems] = useState([]);
  const cartData = useSelector(selectCartData);
  const [showFilterModal, setShowFilterModal] = useState(false);

  useEffect(() => {
    if (cartData) {
      setCurrentCartItems(cartData);
    }
  }, [cartData]);

  const handleFilter = () => {
    console.log("filtro");
    setShowFilterModal(!showFilterModal);
  };

  const handleSortMaxToMin = () => {
    if (currentCartItems) {
      const sortedArray = currentCartItems
        .slice()
        .sort((a, b) => b.price - a.price);
      setCurrentCartItems(sortedArray);
      setShowFilterModal(!showFilterModal);
    }
  };

  const handleSortMinToMax = () => {
    if (currentCartItems) {
      const sortedArray = currentCartItems
        .slice()
        .sort((a, b) => a.price - b.price);
      setCurrentCartItems(sortedArray);
      setShowFilterModal(!showFilterModal);
    }
  };

  const handleRemoveFilter = () => {
    if (cartData) {
      setCurrentCartItems(cartData);
      setShowFilterModal(!showFilterModal);
    }
  };

  return (
    <SafeAreaView style={styles.homeWrapper}>
      <ModalFilter
        modalVisible={showFilterModal}
        onCloseFilter={handleFilter}
        onSortMinToMax={handleSortMinToMax}
        onSortMaxToMin={handleSortMaxToMin}
        onRemoveFilter={handleRemoveFilter}
      />
      <View style={styles.headerTitleWrapper}>
        <Text style={styles.headerTitleText}>Cart</Text>
      </View>
      <TouchableOpacity style={styles.filterIconWrapper} onPress={handleFilter}>
        <MaterialCommunityIcons name={"filter"} size={40} color={"black"} />
      </TouchableOpacity>
      <ScrollView style={styles.scrollviewContainer}>
        {currentCartItems &&
          currentCartItems.map((p, index) => {
            return (
              <Product
                product={p?.product}
                key={p?.product?.id || index}
                cartView={true}
              />
            );
          })}
      </ScrollView>
      <FooterCartInfo />
    </SafeAreaView>
  );
};