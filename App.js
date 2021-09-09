import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from "react";
import { StyleSheet, Text, View } from 'react-native';
import Card from './components/Card';

export default function App() {

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
