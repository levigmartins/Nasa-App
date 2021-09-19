import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, ScrollView, View } from "react-native";

const APODModal = ({img}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const date = (img.date).toString().substring(8,10) + '/' + (img.date).toString().substring(5,7) + '/' + (img.date).toString().substring(0,4);
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
            <Text style={styles.titleStyle}>{img.title}</Text>
            <Text style={styles.modalText}>{img.explanation}</Text>
            <Text style={styles.dateText}>{date}</Text>
            <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
            >
                <Text style={styles.buttonText}>Fechar</Text>
            </Pressable>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>Mais informações</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 5,
    padding: 10,
  },
  buttonOpen: {
    backgroundColor: "#dd361c",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  }, 
  titleStyle: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12
  },
  buttonText: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15
  },
  modalText: {
    marginBottom: 15,
    textAlign: "justify",
    fontSize: 12
  },
  dateText: {
    marginBottom: 15,
    fontSize: 13,
    fontWeight: 'bold',
  },
});

export default APODModal;