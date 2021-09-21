import * as React from 'react';
import { StyleSheet, ScrollView, Text, Button, useWindowDimensions, View } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { DataTable } from 'react-native-paper';
import Config from '../../config.json';
import LoadingScreen from '../components/Loading';


function Eonet({navigation}) {

    const screen=useWindowDimensions();
    const [categories, setCategories] = React.useState([{}]);
    const [isLoading, setLoading] = React.useState(true);

    var [chosen_category, setChosenCategory] = React.useState();
    var [events, setEvents] = React.useState();

    const getCategories = async () => {
        try {
            const response = await fetch('https://eonet.sci.gsfc.nasa.gov/api/v2.1/categories');
            const json = await response.json();
            setCategories((json.categories).map(function(item) {
                const aux = {
                    "id": item["id"],
                    "title": item["title"]
                }
                return aux;
            }));
            setChosenCategory(json.categories[0].id);
        } catch(error) {
            console.log(error);
        }
    }
   
    const getEvents = async () => {
        try {
            const response = await fetch(`https://eonet.sci.gsfc.nasa.gov/api/v2.1/categories/${chosen_category}?limit=5`);
            const json = await response.json();
            setEvents(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    React.useEffect(() => {
        getCategories().then(getEvents());
    }, []);

    if (isLoading) {
        return (
            <LoadingScreen/>
        )
    }

    console.log(events);

    return (
            <ScrollView style={styles.container}>
                <View style={{padding: 20}}>
                    <Text style={{textAlign: 'justify', marginBottom: 10}}>
                        What if there was an API that provided a curated list of natural events 
                        and provided a way to link those events to event-related NRT image layers? 
                        Enter <Text style={{fontWeight: 'bold'}}>EONET</Text>.
                    </Text>
                    <Text style={{textAlign: 'justify'}}>
                        The Earth Observatory Natural Event Tracker (EONET) is a prototype web service 
                        with the goal of providing a curated source of continuously updated natural 
                        event metadata.
                    </Text>
                    <Text style={{marginTop: 12, fontWeight: 'bold', fontSize: 15}}>Choose a category:</Text>
                    <View style={styles.picker}>
                        <Picker
                            selectedValue={chosen_category}
                            onValueChange={(itemValue, itemIndex) => setChosenCategory(itemValue)
                        }>  
                            {categories.map((category, index) => {
                                return <Picker.Item key={`${index}`} label={`${category.title}`} value={`${category.id}`} />
                            })}                                 
                        </Picker>                            
                    </View>
                    <Text style={{textAlign: 'justify', marginVertical: 10}}>{events.description}</Text>
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>Name</DataTable.Title>
                            <DataTable.Title>Date</DataTable.Title>
                            <DataTable.Title>Type</DataTable.Title>
                            <DataTable.Title>Coordinate</DataTable.Title>
                        </DataTable.Header>
                    </DataTable>

                </View>
            </ScrollView>
    );
}

const styles = StyleSheet.create({

    container : {
        display: 'flex',
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#0075C9',        
    },
    picker: {
        padding: 5,
        marginTop: 8,
        borderWidth: 3,
        borderRadius: 10,
        borderColor: 'white',
        borderStyle: 'solid'
    }
});

export default Eonet;
