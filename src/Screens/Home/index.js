import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import Product from "../../Components/Product/Product";
import { Searchbar } from "react-native-paper";
import {
  fetchProducts,
  selectAllProducts,
} from "../../Reducer/Slices/productsSlice";
import {
  selectCartData,
  loadCartStateFromStorage,
  selectCartTotalAmount,
} from "../../Reducer/Slices/cartSlice";
import { styles } from "./styles";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import ModalFilter from "../../Components/Modal/ModalFilter";
import FooterCartInfo from "../../Components/Footer/FooterCartInfo";

export default HomeScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [filteredProducts, setFilteredProducts] = useState(null);
  const [currentProducts, setCurrrentProducts] = useState(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const totalAmount = useSelector(selectCartTotalAmount);
  const products = useSelector(selectAllProducts);
  const cartData = useSelector(selectCartData);
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = React.useState("");

  function filterByValue(array, string) {
    return array.filter((o) =>
      Object.keys(o).some((k) =>
        o[k].toString().toLowerCase().includes(string.toLowerCase())
      )
    );
  }

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    setFilteredProducts(filterByValue(products, query));
  };

  useEffect(() => {
    dispatch(loadCartStateFromStorage());
  }, []);

  useEffect(() => {
    isFocused && dispatch(fetchProducts());
  }, [isFocused]);

  useEffect(() => {
    setCurrrentProducts(products);
  }, [products]);

  const handleFilter = () => {
    console.log("filtro");
    setShowFilterModal(!showFilterModal);
  };

  const handleSortMaxToMin = () => {
    if (currentProducts) {
      const sortedArray = currentProducts
        .slice()
        .sort((a, b) => b.price - a.price);
      setCurrrentProducts(sortedArray);
      setShowFilterModal(!showFilterModal);
    }
  };

  const handleSortMinToMax = () => {
    if (currentProducts) {
      const sortedArray = currentProducts
        .slice()
        .sort((a, b) => a.price - b.price);
      setCurrrentProducts(sortedArray);
      setShowFilterModal(!showFilterModal);
    }
  };

  const handleRemoveFilter = () => {
    if (products) {
      setCurrrentProducts(products);
      setShowFilterModal(!showFilterModal);
    }
  };

  const hendleGoToCartScreen = () => {
    navigation.navigate("CartStack", { screen: "Cart" });
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
      <View style={styles.headerWrapper}>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchBar}
        />
        <TouchableOpacity
          style={styles.cartHeaderIconWrapper}
          onPress={hendleGoToCartScreen}
        >
          {cartData && cartData.length > 0 && (
            <View style={styles.cartHeaderAmountIndicator}>
              <Text style={styles.cartHeaderAmountIndicatorText}>
                {cartData.map((item) => item.amount).reduce((a, b) => a + b, 0)}
              </Text>
            </View>
          )}
          <MaterialCommunityIcons
            name={"cart-heart"}
            size={40}
            color={"blue"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterIconWrapper}
          onPress={handleFilter}
        >
          <MaterialCommunityIcons name={"filter"} size={40} color={"black"} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollviewContainer}>
        {currentProducts ? (
          searchQuery.length < 1 ? (
            currentProducts.map((p) => {
              return <Product product={p} key={p.id} />;
            })
          ) : (
            filteredProducts.map((p) => {
              return <Product product={p} key={p.id} />;
            })
          )
        ) : (
          <Text style={styles.loadingProductsText}>CARGANDO PRODUCTOS....</Text>
        )}
      </ScrollView>
      {cartData && <FooterCartInfo />}
    </SafeAreaView>
  );
};
