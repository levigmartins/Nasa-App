import * as React from 'react';
import { StyleSheet, ScrollView, Text, Button, View } from 'react-native';

function Home({navigation}) {
    return (
        <ScrollView style={styles.container}>
            <View style={{padding: 20}}>
                <Text style={{fontSize: 15, fontWeight: 'bold', marginBottom: 5}}>Welcome to MyNASA!</Text>
                <Text style={{marginBottom: 20, textAlign: 'justify'}}>
                    This app was designed with two purposes: to show people that love space the cool things
                    we can find in the NASA API library and as a learning device for me, the developer.
                </Text>
                <View style={{marginBottom: 12}}><Button title="APOD" color="#dd361c" onPress={() => {navigation.navigate('Apod')}}/></View>
                <View style={{marginBottom: 12}}><Button title="NeoWs" color="#dd361c" onPress={() => {navigation.navigate('Apod')}}/></View>
                <View style={{marginBottom: 12}}><Button title="Mars Hover Photos" color="#dd361c" onPress={() => {navigation.navigate('Apod')}}/></View>
                <View style={{marginBottom: 12}}><Button title="EONET" color="#dd361c" onPress={() => {navigation.navigate('Eonet')}}/></View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create ({
    container: {
        display: 'flex',
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#0075C9',  
    }
});

export default Home;