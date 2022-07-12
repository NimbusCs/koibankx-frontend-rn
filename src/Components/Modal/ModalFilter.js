import React from "react";
import { Alert, Modal, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

export default ({
  modalVisible,
  onCloseFilter,
  onSortMinToMax,
  onSortMaxToMin,
  onRemoveFilter,
  ...props
}) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          onCloseFilter();
        }}
      >
        <View style={[styles.centeredView, styles.modalBackground]}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Ordenar precios:</Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={onSortMaxToMin}
            >
              <Text style={styles.textStyle}>De mayor a menor</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={onSortMinToMax}
            >
              <Text style={styles.textStyle}>De menor a mayor</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonRemoveFilter]}
              onPress={onRemoveFilter}
            >
              <Text style={styles.textStyle}>Desactivar filtro</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};