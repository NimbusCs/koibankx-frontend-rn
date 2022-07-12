import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  homeWrapper: {
    height: Dimensions.get("window").height - 50,
  },
  searchBar: {
    marginTop: 50,
    width: Dimensions.get("window").width * 0.8,
  },
  headerTitleWrapper: {
    backgroundColor: "white",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitleText: {
    color: "blue",
    fontSize: 30,
    fontWeight: "bold",
  },
  filterIconWrapper: {
    alignSelf: "flex-end",
  },
  scrollviewContainer: {
    backgroundColor: "black",
  },
});