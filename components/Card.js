import React, {useEffect, useState} from "react";


import { View, Text,Image, StyleSheet, TouchableOpacity } from "react-native";

const Card = props =>{


    return (
        <TouchableOpacity>
            <View style={styles.cardContainer}>
                <View style={styles.leftContainer}>
                    <Image style={styles.image} source={{uri: "https://e7.pngegg.com/pngimages/261/204/png-clipart-bitcoin-bitcoin-thumbnail.png"}} />
                    <View style={styles.titlesContainer}>
                    <Text style={styles.title}>Bitcoin</Text>
                    <Text style={styles.subtitle}>BTC</Text>
                    </View>
                </View>



                <View style={styles.rightContainer}>
                    <Text style={styles.title}>Bitcoin</Text>
                    <Text style={[styles.subtitle, {color: 'red'}]}>BTC</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    cardContainer:{
        paddingHorizontal:15,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', 
    },

    leftContainer:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        height: 48,
        width: 48,
    },
    titlesContainer:{
        marginLeft: 8,
    },
    title:{
        fontSize: 18,

    },
    subtitle:{
        marginTop: 4,
        fontSize: 14,
        color: 'grey'
    },
    rightContainer:{
        alignItems: 'flex-end'
    }
});

export default Card;
