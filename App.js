import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState,useRef, useMemo} from "react";
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Card from './components/Card';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

export default function App() {

    const[data,setData] = useState({InfoBTC: null, InfoETH: null,historyInfo: null, BTCchangePrice: null, ETHchangePrice: null});
    const[coinPressed, setCoin] = useState("ETHUSD");
    const roundToTwo=(num)=> {
      return +(Math.round(num + "e+2")  + "e-2");
  }
    
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
            if (BTCcoinData === null ||ETHcoinData === null || historyData === null)
              check();
            else {
              let result = historyData.data.result;
              let symbol = Object.keys(result)[0];
              let BTCcoinResult = BTCcoinData.data.result;
              let BTCcoinSymbol = Object.keys(BTCcoinResult);
              let ETHcoinResult = ETHcoinData.data.result;
              let ETHcoinSymbol = Object.keys(ETHcoinResult)
              if(Object.keys(result) === undefined){
                setTimeout(() => {
                  return;
                }, 3000);
              }
              setData({ InfoBTC: BTCcoinResult[BTCcoinSymbol],InfoETH: ETHcoinResult[ETHcoinSymbol] ,historyInfo: result[symbol], BTCchangePrice: checkPriceChange( BTCcoinResult[BTCcoinSymbol].p[0],  BTCcoinResult[BTCcoinSymbol].p[1]), ETHchangePrice:  checkPriceChange( ETHcoinResult[ETHcoinSymbol].p[0],  ETHcoinResult[ETHcoinSymbol].p[1])});
              
            }
          }, 4000);
        };
        check();
        
        const checkPriceChange = (newNumber, originalNumber)=>{
          let change = 0;
          if(newNumber > originalNumber){
             change = newNumber - originalNumber;
            change = change/originalNumber *100;
            return roundToTwo(change);
          }else{
             change = originalNumber - newNumber;
            change = change/originalNumber *100
            return "-"+roundToTwo(change);
    
          }
          
        }
        

        
      
          
        
       
      };
      
      fetchData();
      console.log(data.InfoBTC);
    }, [])

    // ref
  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['50%'], []);

  const openModal = () =>{
    bottomSheetModalRef.current.present();
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        
        <Text style={styles.title}>Info</Text>
      </View>
      {data.InfoBTC &&
      <BottomSheetModalProvider>
      <View>   
        <Card onPress={() =>openModal()} currency={"BitCoin"} 
            logoUrl={"https://e7.pngegg.com/pngimages/261/204/png-clipart-bitcoin-bitcoin-thumbnail.png"}
            symbol={"BTC"} 
            currentPrice={roundToTwo(data.InfoBTC.b[0])}
            priceChange={data.BTCchangePrice}
            onPress={() => openModal()}
            />

          <Card onPress={() =>openModal()} currency={"Etherium"} 
            logoUrl={"https://toppng.com/uploads/preview/innovationhere-is-a-png-file-i-designed-of-ethereum-ethereum-logo-11563061039k7z95jc7md.png"}
            symbol={"ETH"} 
            currentPrice={roundToTwo(data.InfoETH.b[0])}
            priceChange={data.ETHchangePrice}
            />    
          </View>

          <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          >
            <View style={styles.contentContainer}>
              <Text>Awesome 🎉</Text>
            </View>
          </BottomSheetModal>
          </BottomSheetModalProvider>  
         
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
