import React, {useEffect, useState} from "react";


import { View, Text,Image, StyleSheet, TouchableOpacity } from "react-native";

const Card = ({currency, symbol, currentPrice, priceChange, logoUrl}) =>{


    return (
        <TouchableOpacity>
            <View style={styles.cardContainer}>
                <View style={styles.leftContainer}>
                    <Image style={styles.image} source={{uri: logoUrl}} />
                    <View style={styles.titlesContainer}>
                    <Text style={styles.title}>{currency}</Text>
                    <Text style={styles.subtitle}>{symbol}</Text>
                    </View>
                </View>



                <View style={styles.rightContainer}>
                    <Text style={styles.title}>{currentPrice}</Text>
                    <Text style={[styles.subtitle, {color: 'red'}]}>{priceChange}</Text>
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
