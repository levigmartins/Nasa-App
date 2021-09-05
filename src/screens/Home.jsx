import * as React from 'react';
import { StyleSheet, ScrollView, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import Image from 'react-native-scalable-image';
import Config from '../../config.json';

function Home({navigation}) {

    const screen=useWindowDimensions();
    const today = new Date().toISOString();
    const [isLoading, setLoading] = React.useState(true);

    var [date, setDate] = React.useState(today.substring(0,10));
    var [img, setImg] = React.useState();

    const getAPOD = async () => {
        try {
            const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${Config.APP_KEY}&date=${date}`);
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

    return (
        <View style={{flex:1}}>
            <ScrollView style={styles.container}>
                <Text style={{textAlign: 'justify'}}>One of the most popular websites at NASA is 
                    the Astronomy Picture of the Day, or <Text style={{fontWeight: 'bold'}}>APOD</Text>. 
                    In fact, this website is one of the most popular websites across all federal agencies. 
                    It has the popular appeal of a Justin Bieber video.
                </Text>
                <TouchableOpacity onPress={() => {
                        alert(`Name: ${img.title}`)
                }}>
                    <Image
                        width={screen.width/1.1}
                        source={{uri: `https://apod.nasa.gov/apod/image/1607/FireflyMilkyWayMPark1024.jpg`}}
                    />
                </TouchableOpacity>               
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
    }
});

export default Home;