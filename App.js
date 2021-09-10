import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from "react";
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Card from './components/Card';

export default function App() {

    const[data,setData] = useState({InfoBTC: null, InfoETH: null,historyInfo: null, changePrice: null});
    const[coinPressed, setCoin] = useState("ETHUSD");
   
    
    useEffect(() =>{
      
      const fetchData = async () => {
        const BTCcoinData = await axios(
          `https://api.kraken.com/0/public/Ticker?pair=BTCUSD`
        );

        const ETHcoinData = await axios(
          `https://api.kraken.com/0/public/Ticker?pair=ETHUSD`
        );
        const historyData = await axios(
          `https://api.kraken.com/0/public/OHLC?pair=${coinPressed}`
        );
        let check = function() {
          setTimeout(function () {
            if (BTCcoinData === null || historyData === null)
              check();
            else {
              let result = historyData.data.result;
              let symbol = Object.keys(result)[0];
              let BTCcoinResult = BTCcoinData.data.result;
              let BTCcoinSymbol = Object.keys(BTCcoinResult);
              let ETHcoinResult = ETHcoinData.data.result;
              let ETHcoinSymbol = Object.keys(ETHcoinResult)
              if(symbol === undefined){
                setTimeout(() => {
                  
                }, 1000);
              }
              setData({ InfoBTC: BTCcoinResult[BTCcoinSymbol],InfoETH: ETHcoinResult[ETHcoinSymbol] ,historyInfo: result[symbol], changePrice: checkPriceChange( BTCcoinResult[BTCcoinSymbol].p[0],  BTCcoinResult[BTCcoinSymbol].p[1]) });
              
            }
          }, 4000);
        };
        check();
        function roundToTwo(num) {
          return +(Math.round(num + "e+2")  + "e-2");
      }
        const checkPriceChange = (newNumber, originalNumber)=>{
          let change = 0;
          if(newNumber > originalNumber){
             change = newNumber - originalNumber;
            change = change/originalNumber *100;
            return roundToTwo(change)+"%";
          }else{
             change = originalNumber - newNumber;
            change = change/originalNumber *100
            return "-"+roundToTwo(change)+"%";
    
          }
          
        }
        

        
      
          
        
       
      };
      
      fetchData();
      console.log(data.InfoBTC);
    }, [data])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        
        <Text style={styles.title}>Info</Text>
      </View>
      {data.InfoBTC &&

      <View>
     
        <Card onPress={() =>setCoin("ETHUSD")} currency={"BitCoin"} 
            logoUrl={"https://e7.pngegg.com/pngimages/261/204/png-clipart-bitcoin-bitcoin-thumbnail.png"}
            symbol={"BTC"} 
            currentPrice={data.InfoBTC.b[0]}
            priceChange={data.changePrice}
            />

          <Card onPress={() =>setCoin("ETHUSD")} currency={"BitCoin"} 
            logoUrl={"https://e7.pngegg.com/pngimages/261/204/png-clipart-bitcoin-bitcoin-thumbnail.png"}
            symbol={"ETH"} 
            currentPrice={data.InfoETH.b[0]}
            priceChange={data.changePrice}
            />  
            
          </View>  
         
          }
     
     
      
     
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
