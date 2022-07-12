import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  productContainer: {
    width: Dimensions.get("window").width * 0.95,
    alignSelf: "center",
    marginBottom: 15,
    borderRadius: 20,
    marginTop: 20,
  },
  productTitleContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 5,
  },
  productActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    padding: 10,
  },
  productAmountSelector: {
    justifyContent: "center",
    padding: 10,
  },
  productTitleText: {
    fontSize: 18,
  },
  productPriceText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
    paddingLeft: 10,
  },
  productStockText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "red",
    paddingLeft: 10,
  },
  addCartAction: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  addCartText: {
    fontSize: 15,
    marginLeft: 10,
    color: "blue",
  },
  centeredView: {
    height: Dimensions.get("screen").height,
    width: Dimensions.get("window").width,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  amountSelectorContainer: {
    flexDirection: "row",
    backgroundColor: "#71e3a8",
    width: 100,
    justifyContent: "center",
    borderRadius: 20,
  },
  setSelectedAmountText: {
    alignSelf: "center",
    fontWeight: "bold",
  },
  inCartText: {
    color: "purple",
  },
});