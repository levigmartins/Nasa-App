import * as React from 'react';
import { StyleSheet, ScrollView, Text, Button, useWindowDimensions, View } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Image from 'react-native-scalable-image';
import Config from '../../config.json';

import LoadingScreen from '../components/Loading';
import APODModal from '../components/APODModal';

function Home({navigation}) {

    const screen=useWindowDimensions();
    const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
    const [isLoading, setLoading] = React.useState(true);

    var [img, setImg] = React.useState();

    function parseDate(value) {
        return value.toISOString().substring(0,10);
    }

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = async (date) => {
        try {
            const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${Config.APP_KEY}&date=${parseDate(date)}`);
            const json = await response.json();
            setImg(json);
        } catch (error) {
            console.error(error);
        } finally {
            hideDatePicker();
        }
    };
   
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
                
                <Button style={{marginBottom: 200}} title="Escolher outra data" onPress={showDatePicker} />
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />

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
    button: {
        borderRadius: 20,
        padding: 10,
        backgroundColor: "#2196F3",
    }
});

export default Home;