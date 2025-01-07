import React, {useState} from 'react';
import {StatusBar, Button, StyleSheet, Text, TouchableOpacity, View, FlatList, Image, ScrollView} from 'react-native';
import { datasource } from './Data.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
	BookBox: {
        borderWidth: 1,
        padding: 10,
        flexDirection:"row",
        backgroundColor:"white"
    },
    LibraryDisplay: {
        borderWidth:1,
        padding: 10,
        backgroundColor:"lightblue",
        //add margin bottom for scroll view FlatList so can see the last item
        marginBottom:100
    }
});

const Home = ({navigation}) => {
  const [mydata, setMydata] = useState([]);

  const getData = async() => {
      let datastr = await AsyncStorage.getItem("alphadata");
      if(datastr!=null) {
          jsondata = JSON.parse(datastr);
          setMydata(jsondata);
      }
      else {
          setMydata(datasource);
      }
  };

  getData();

  const renderItem = ({item, index}) => {
    return (
    <TouchableOpacity style={styles.opacityStyle}
    onPress={()=>
      {
        let datastr = JSON.stringify(mydata);
        navigation.navigate("Edit",{index:index, title:item.title, isbn:item.isbn, copies:item.copies, url:item.url, datastring: datastr})
      }
    }
    >
        <View style={styles.BookBox}>
            <View style={{flex:1, justifyContent:'space-around'}}>
                <Text style={{fontWeight:"bold"}}>{item.title}</Text>
                <Text>ISBN: {item.isbn}</Text>
                <Text>Copies Owned: {item.copies}</Text>
            </View>
            <Image source={{uri: item.url }} style={{width: 100, height:150}}/>
        </View>
    </TouchableOpacity>
    );
  };

   return (
    <View>
      <StatusBar/>
        <View style={{padding:10}}>
            <Button title='Add Book'
                    onPress={()=>{
                        let datastr = JSON.stringify(mydata)
                        navigation.navigate("Add", {datastring:datastr});
                    }
                    }
            />
        </View>

        <ScrollView>
            <View style={styles.LibraryDisplay}>
                <FlatList
                    data={mydata}
                    renderItem={renderItem}
                />
            </View>
        </ScrollView>
    </View>
  );
};

export default Home;
