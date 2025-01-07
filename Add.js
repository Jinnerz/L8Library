import React,{useState} from 'react';
import {StatusBar, View, Button, Text, TextInput, StyleSheet} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
// import { datasource } from './Data';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    TitleBox: {
        backgroundColor: 'lightblue',
        padding: 10,
    }
})

const Add = ({navigation, route}) => {
    const[title,setTitle] = useState("");
    const[isbn,setIsbn] = useState("");
    const[copies,setCopies] = useState("");
    const[url, setUrl] = useState("");

  const setData = async(value) => {
      AsyncStorage.setItem("alphadata", value);
      navigation.navigate('Home');
  };

  return (
    <View>
        <StatusBar/>
        <View style={{padding: 10}}>
            <View style={styles.TitleBox}>
                <Text style={{textAlign:'center', fontWeight:'bold'}}>Add New Book!</Text>
            </View>
        </View>


        <View style={{padding: 10, gap: 10}}>
            <View>
                <Text>Book Title:</Text>
                <TextInput style={{borderWidth:1}} onChangeText={(text)=>setTitle(text)}/>
            </View>
            <View>
                <Text>Book ISBN:</Text>
                <TextInput style={{borderWidth:1}} onChangeText={(text)=>setIsbn(text)}/>
            </View>
            <View>
                <Text>Number of Copies:</Text>
                <TextInput style={{borderWidth:1}} onChangeText={(text)=>setCopies(text)}/>
            </View>
            <View>
                <Text>Book Image URL:</Text>
                <TextInput style={{borderWidth:1}} onChangeText={(text)=>setUrl(text)}/>
                <Text style={{fontWeight:'200'}}>Pro Tip: Visit Amazon.com to copy the image address of the book.</Text>
            </View>
        </View>

        <View style={{padding: 10}}>
            <Button title='Submit'
                    onPress={()=>{
                        let mydata = JSON.parse(route.params.datastring);
                        let convertCopies = Number(copies)
                        let item = {title:title, isbn:isbn, copies: convertCopies, url:url};
                        mydata.push(item);
                        let stringdata = JSON.stringify(mydata);
                        setData(stringdata);
                        //navigation.navigate("Home");
                    }
                    }
            />
        </View>

    </View>
  );
};

export default Add;
