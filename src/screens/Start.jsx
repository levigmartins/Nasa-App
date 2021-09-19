import * as React from 'react';
import { StyleSheet, View, TouchableOpacity, useWindowDimensions } from "react-native";
import Image from 'react-native-scalable-image';

function Start({ navigation }) {

  const screen=useWindowDimensions();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => { navigation.navigate('Apod') }}>
        <Image
          source={require('../static/img/nasa.png')}
          width={screen.width/1.5}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#0075C9',
  }
});

export default Start;