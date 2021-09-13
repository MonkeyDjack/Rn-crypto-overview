import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState,useRef, useMemo} from "react";
import { FlatList, StyleSheet, Text, View } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import Chart from './components/Chart';
import CardList from './components/CardList';
import Card from './components/Card';
import { WatchListContextProvider } from './components/context/watchListContext';

export default function App() {


  return (
    <WatchListContextProvider>
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Crypto overview</Text>
        <CardList /> 
      </View> 
     
    </View>
    </WatchListContextProvider>
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
