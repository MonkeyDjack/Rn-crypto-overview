import React from "react";
import { StyleSheet } from "react-native";

const darkMode = StyleSheet.create({
    testTheme:{
        backgroundColor: '#000',
        color: '#fff'
    },
    container: {
        flex: 1,
        backgroundColor: "#000",
      },
      title:{
        fontSize: 26,
        fontWeight: 'bold',
        color: '#fff'
      },
      header:{
        marginTop:80,
        paddingHorizontal:20,
        color: '#fff'
      },
      bottomSheet:{
        shadowColor: 'white',
        shadowOffset: {
          width: 0,
          height: -4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
      }
});

export default darkMode;