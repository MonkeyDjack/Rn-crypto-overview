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
        if (watchList.length > 0) {
            fetchData();
          } else setCoins([]);
        }, [watchList]);


    const renderCards =() =>{
        //console.log(Object.entries(coins))
        if(isLoading){
            return <Text>Loading</Text>
        }
        
            return(
                <View>
                    <View>
                    { Object.entries(coins).map((card, i) =>{
                        console.log(card[1])
                        return <Card key={card[0]}  card={card[1]}/> 
                    
                    })}
                    </View>
                </View>
            );
        
    };

    return (<View>{renderCards()}</View>);
}


export default CardList;
