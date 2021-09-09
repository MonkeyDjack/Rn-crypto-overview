import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from "react";
import { StyleSheet, Text, View } from 'react-native';
import Card from './components/Card';

export default function App() {

    const[data,setData] = useState({coinInfo: null, historyInfo: null});
    const[coinPressed, setCoin] = useState("BTCUSD");
    useEffect(() =>{
      const fetchData = async () => {
        const coinData = await axios(
          `https://api.kraken.com/0/public/Ticker?pair=${coinPressed}`
        );
        const historyData = await axios(
          `https://api.kraken.com/0/public/OHLC?pair=${coinPressed}`
        );


        let result = historyData.data.result;
        let symbol = Object.keys(result)[0];

  
        setData({ coinInfo: coinData.data, historyInfo: result[symbol] });
      };
      
      fetchData();
      console.log(data.historyInfo);
    }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Info</Text>
      </View>
      <Card />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title:{
    fontSize: 26,
    fontWeight: 'bold',
  },
  header:{
    marginTop:100,
    paddingHorizontal:20
  }
});
