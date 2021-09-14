import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState,useRef, useMemo, useContext} from "react";
import { FlatList, StyleSheet, Text, View, Appearance } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import Chart from './components/Chart';
import CardList from './components/CardList';
import { WatchListContextProvider } from './components/context/watchListContext';
import darkMode from './components/css/darkMode';
import {  ThemeWatchListContextProvider } from './components/context/themeWatchList';

export default function App() {
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(()=>['50%'], []);


  const openModal = () => {
    bottomSheetModalRef.current.present();
    console.log('hello');
  }
  const [chosenCoin,setChosenCoin] = useState('');
  const getChartCoin = (index) => { // the callback
    setChosenCoin(index);
    console.log(chosenCoin)
  };

  return (
    <ThemeWatchListContextProvider>
    <WatchListContextProvider>
      <BottomSheetModalProvider>
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Crypto overview</Text>
      </View>
      <CardList modal={() => openModal()} getChartCoin={getChartCoin} /> 
    </View>
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      style={styles.bottomSheet}
      >
        <Chart symbol ={chosenCoin} />
      </BottomSheetModal>
    </BottomSheetModalProvider>
    </WatchListContextProvider>
    </ThemeWatchListContextProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title:{
    fontSize: 26,
    fontWeight: 'bold',
  },
  header:{
    marginTop:80,
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
