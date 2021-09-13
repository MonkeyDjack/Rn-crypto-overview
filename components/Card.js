import React from "react";
import { View, Text,Image, StyleSheet, TouchableOpacity, FlatList } from "react-native";


const Card = ({card}) =>{
    console.log('df')
    const roundToTwo=(num)=> {
        return +(Math.round(num + "e+2")  + "e-2");
    };
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
    };
    return (
        <TouchableOpacity >
            <View style={styles.cardContainer}>
                <View style={styles.leftContainer}>
                    <Image style={styles.image}  />
                    <View style={styles.titlesContainer}>
                    <Text style={styles.title}>{console.log(card[1])}</Text>
                    <Text style={styles.subtitle}>HELLOHELLO</Text>
                    </View>
                </View>



                <View style={styles.rightContainer}>
                    <Text style={styles.title}>${roundToTwo(card.b[0])}</Text>
                    <Text style={styles.subtitle}>{checkPriceChange(card.p[0], card.p[1])}</Text>
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