import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalBackground: {
    zIndex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  modalView: {
    margin: 20,
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 5,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  buttonRemoveFilter: {
    backgroundColor: "red",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});