import React, {useContext, useEffect, useState} from "react";
import krakenApi from "./api/krakenApi";

import Card from "./Card";
import { View, Text,Image, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { WatchListContext } from "./context/watchListContext";

const CardList = ({modal,getChartCoin}) =>{
    const [coins, setCoins] = useState([]);
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

        const cardOnPress = (symbol) =>{
            modal();
            getChartCoin(symbol);
        }
        
            return(

                    
                        <View>
                    { Object.entries(coins).map((card, i) =>{
                        
                        return <TouchableOpacity key={`${i}+${card[0]}`} onPress={()=>cardOnPress(card[0])}><Card key={`${i+1}+${card[0]}`} symbol={card[0]}  card={card[1]}/></TouchableOpacity>
                    
                    })}
                    </View>
                    

            );
        
    };

    return (<View>{renderCards()}</View>);
}


export default CardList;
