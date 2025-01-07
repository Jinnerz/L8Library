import React,{useState} from 'react';
import {Alert, View, Button, Text, TextInput, StyleSheet} from 'react-native';
// import { datasource } from './Data.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    TitleBox: {
        backgroundColor: 'lightblue',
        padding: 10,
    }
})

const Edit = ({navigation, route}) => {
    let mydata = JSON.parse(route.params.datastring);
    let myindex = route.params.index;

    const[title,setTitle] = useState(route.params.title);
    const[isbn,setIsbn] = useState(route.params.isbn);
    const[copies,setCopies] = useState(route.params.copies);
    const[url, setUrl] = useState(route.params.url);

    const setData = async(value) => {
        AsyncStorage.setItem("alphadata", value);
        navigation.navigate('Home');
    };

  return (

    <View>
        <View style={{padding: 10}}>
            <View style={styles.TitleBox}>
                <Text style={{textAlign:'center', fontWeight:'bold'}}>Edit Existing Book!</Text>
            </View>
        </View>

        <View style={{padding: 10, gap: 10}}>
            <View>
                <Text>Book Title:</Text>
                <TextInput value={title} style={{borderWidth:1}} onChangeText={(text)=>setTitle(text)}/>
            </View>
            <View>
                <Text>Book ISBN:</Text>
                <TextInput value={isbn} style={{borderWidth:1}} onChangeText={(text)=>setIsbn(text)}/>
            </View>
            <View>
                <Text>Number of Copies:</Text>
                <TextInput value={String(copies)} style={{borderWidth:1}} onChangeText={(text)=>setCopies(text)}/>
            </View>
            <View>
                <Text>Book Image URL:</Text>
                <TextInput value={url} style={{borderWidth:1}} onChangeText={(text)=>setUrl(text)}/>
                <Text style={{fontWeight:'200'}}>Pro Tip: Visit Amazon.com to copy the image address of the book.</Text>
            </View>
        </View>

      <View style={{flexDirection:"row"}}>
        <View style={{margin:10,flex:1}}>
        <Button title='Save'
          onPress={()=>{
              let mydata = JSON.parse(route.params.datastring);
              mydata[myindex]={title, isbn, copies, url}
              let stringdata = JSON.stringify(mydata);
              setData(stringdata);
              //navigation.navigate("Home");
          }
        }
        />
        </View>
        <View style={{margin:10,flex:1}}>
        <Button title='Delete'
          onPress={()=>{
            Alert.alert("Are you sure?",'',
              [{text:'Yes', onPress:()=>{
                  mydata.splice(myindex,1);
                  let stringdata = JSON.stringify(mydata);
                  setData(stringdata);
              }},
              {text:'No'}])
          }
        }
        />
        </View>
      </View>
    </View>
  );
};

export default Edit;
