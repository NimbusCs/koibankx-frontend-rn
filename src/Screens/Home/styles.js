import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  homeWrapper: {
    height: Dimensions.get("window").height - 50,
  },
  searchBar: {
    marginTop: 50,
    flex: 1,
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  cartHeaderIconWrapper: {
    alignSelf: "flex-end",
    marginHorizontal: 15,
  },
  cartHeaderAmountIndicator: {
    backgroundColor: "red",
    height: 20,
    width: 20,
    borderRadius: 100,
    position: "absolute",
    top: -10,
    zIndex: 1,
  },
  cartHeaderAmountIndicatorText: {
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
  },
  filterIconWrapper: {
    alignSelf: "flex-end",
  },
  scrollviewContainer: {
    backgroundColor: "black",
  },
  loadingProductsText: {
    fontWeight: "bold",
    fontSize: 25,
    color: "white",
    alignSelf: "center",
  },
  footerWrapper: {
    backgroundColor: "white",
    height: 50,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  footerWrapperText: { fontWeight: "bold" },
});