import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";

const Home = ({ navigation }) => {
  return <View style={styles.container}>
    <TouchableOpacity onPress={() => { navigation.navigate("ej") }}>
      <Image style={styles.logo} 
        source={require('../static/img/nasa.png')}/>
    </TouchableOpacity>
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#0075C9',
  },
  logo: {
    height: 280,
    width: 280,
  },
});

export default Home;