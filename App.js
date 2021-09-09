import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from "react";
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const[data, setData] = useState();

  useEffect(() =>{
    axios.get('https://api.kraken.com/0/public/OHLC?pair=XBTUSD')
    .then( res =>{
      const data = res.data.result
      var name = Object.keys(data)[0]; // Get the first item of the list;  = key name
      var value = data[name];


      setData(value)
      console.log(data)
    }).catch(error=> console.log(error))
  },[])
  return (
    <View style={styles.container}>
      <Text>{data[0][1]}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
