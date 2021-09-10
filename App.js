import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState,useRef, useMemo} from "react";
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Card from './components/Card';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import Chart from './components/Chart';

export default function App() {
    const[data,setData] = useState({InfoBTC: null, InfoETH: null,historyInfo: null, BTCchangePrice: null, ETHchangePrice: null});
    const[coinPressed, setCoin] = useState("BTCUSD");
    const [selectedData, setSelectedData] = useState();
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
          }, 1000);
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

  const openModal = (currency) =>{
    if(currency === "Bitcoin"){
      setCoin("BTCUSD");
      setSelectedData(data.InfoBTC)
    }
    if(currency === "Etherium"){
      setCoin("ETHUSD");
      setSelectedData(data.InfoETH)
    }
    setSelectedData(selectedData);
    bottomSheetModalRef.current.present();
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        
        <Text style={styles.title}>Info</Text>
      </View>
      
      <BottomSheetModalProvider>
      {data.InfoBTC && data.InfoETH ?(
      <View>   
        <Card onPress={() =>openModal("Bitcoin")} currency={"BitCoin"} 
            logoUrl={"https://e7.pngegg.com/pngimages/261/204/png-clipart-bitcoin-bitcoin-thumbnail.png"}
            symbol={"BTC"} 
            currentPrice={roundToTwo(data.InfoBTC.b[0])}
            priceChange={data.BTCchangePrice}
            
            />

          <Card onPress={() =>openModal("Etherium", data.InfoETH)} currency={"Etherium"} 
            logoUrl={"https://toppng.com/uploads/preview/innovationhere-is-a-png-file-i-designed-of-ethereum-ethereum-logo-11563061039k7z95jc7md.png"}
            symbol={"ETH"} 
            currentPrice={roundToTwo(data.InfoETH.b[0])}
            priceChange={data.ETHchangePrice}
            />    
          </View>
          ):null}
          <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          style={styles.bottomSheet}
          >
            
            <View style={styles.contentContainer}>
            {data.historyInfo ? (
              <Chart
                history={data.historyInfo} 
                
              />
            ):null}
            </View>
          </BottomSheetModal>
          </BottomSheetModalProvider>  
          
      
     
     
      
     
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
  },
  bottomSheet:{
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  }
});
