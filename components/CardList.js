import React, {useContext, useEffect, useState} from "react";
import krakenApi from "./api/krakenApi";

import Card from "./Card";
import { View, Text,Image, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { WatchListContext } from "./context/watchListContext";

const CardList = () =>{
    const [coins, setCoins] = useState([]);
    //const priceChangeColor = priceChange > 0 ? 'green': 'red'; 
    const {watchList} = useContext(WatchListContext);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(()=>{
        const fetchData = async() => {
            setIsLoading(true)
           const response = await krakenApi.get('/Ticker', {
                params:{
                    pair: watchList.join(",")
                }
            })
            setCoins(response.data.result);
            setIsLoading(false);
        }
        fetchData();
    }, [])
    if(isLoading){

    }
    const renderCards =() =>{
        if(isLoading){
            return <Text>Loading</Text>
        }else{
            return(
                <FlatList>
                    { Object.entries(coins).map(card =>{
                        <Card key={card[0]}  card={card[1]}/> 
                    })}
                </FlatList>
            )
        }
    }

    return (<View>{renderCards()}</View>);
}


export default CardList;
