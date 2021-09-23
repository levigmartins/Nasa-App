import * as React from 'react';
import { StyleSheet, ScrollView, Text, Modal, View, Pressable } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { DataTable } from 'react-native-paper';
import LoadingScreen from '../components/Loading';

function Eonet({navigation}) {

    const [categories, setCategories] = React.useState([{}]);
    const [isLoading, setLoading] = React.useState(true);
    const [modalVisible, setModalVisible] = React.useState(false);

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
        } finally {
            try {
                const response = await fetch('https://eonet.sci.gsfc.nasa.gov/api/v2.1/categories');            
                const json = await response.json();
                const event = json.categories[0].id;

                const response2 = await fetch(`https://eonet.sci.gsfc.nasa.gov/api/v2.1/categories/${event}?limit=5`);
                const json2 = await response2.json();
                setEvents(json2);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
    }
   
    const getEvents = async (event) => {
        try {
            const response = await fetch(`https://eonet.sci.gsfc.nasa.gov/api/v2.1/categories/${event}?limit=5`);
            const json = await response.json();
            setEvents(json);
        } catch (error) {
            console.error(error);
        }
    }    

    React.useEffect(() => {
        getCategories();
    }, []);

    function renderCells() {
        if(events.events[0]!=undefined) {
            return (
                (events.events).map((each, index) => {
                    return (
                        <DataTable.Row key={`${index}`}>
                            <DataTable.Cell>{each.title}</DataTable.Cell>
                            <DataTable.Cell>{(each.geometries[0].date).substring(0,10)}</DataTable.Cell>                        
                        </DataTable.Row>
                    )
                })
            )
        };
    }

    if (isLoading) {
        return (
            <LoadingScreen/>
        )
    };

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
                            onValueChange={(itemValue, itemIndex) => {
                                setChosenCategory(itemValue);
                                getEvents(itemValue);
                        }}>  
                            {categories.map((category, index) => {
                                return <Picker.Item key={`${index}`} label={`${category.title}`} value={category.id} />
                            })}                                 
                        </Picker>                            
                    </View>
                    <Text style={{textAlign: 'justify', marginVertical: 10, color: 'white', fontWeight: 'bold'}}>Description: {events.description}</Text>
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>Name</DataTable.Title>
                            <DataTable.Title>Date</DataTable.Title>
                            
                        </DataTable.Header>                        
                        {renderCells()}
                                        
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
    },    
});

export default Eonet;
