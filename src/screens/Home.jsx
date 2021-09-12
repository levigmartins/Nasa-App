import * as React from 'react';
import { StyleSheet, ScrollView, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import Image from 'react-native-scalable-image';
import Config from '../../config.json';

import LoadingScreen from '../components/Loading';
import APODModal from '../components/APODModal';

function Home({navigation}) {

    const screen=useWindowDimensions();
    const today = new Date().toISOString();
    const [isLoading, setLoading] = React.useState(true);

    var [date, setDate] = React.useState(today.substring(0,10));
    var [img, setImg] = React.useState();
   
    const getAPOD = async () => {
        try {
            const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${Config.APP_KEY}`);
            const json = await response.json();
            setImg(json);
          } catch (error) {
            console.error(error);
          } finally {
            setLoading(false);
          }
    }


    React.useEffect(() => {
        getAPOD();
    }, []);

    if (isLoading) {
        return (
            <LoadingScreen/>
        )
    }

    return (
        <View style={{flex:1}}>
            <ScrollView style={styles.container}>
                <Text style={{textAlign: 'justify'}}>One of the most popular websites at NASA is 
                    the Astronomy Picture of the Day, or <Text style={{fontWeight: 'bold'}}>APOD</Text>. 
                    In fact, this website is one of the most popular websites across all federal agencies. 
                    It has the popular appeal of a Justin Bieber video.
                </Text>
                <Image
                    width={screen.width/1.1}
                    source={{uri: `${img.url}`}}
                    style={{marginBottom: 15}}
                />
                <APODModal img={img} style={{marginBottom: 20}}/>
                <Text style={{marginBottom: 50}}>a</Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({

    container : {
        display: 'flex',
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#0075C9',
        padding: 20,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
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
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

export default Home;