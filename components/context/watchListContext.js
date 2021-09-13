import { createContext, useState } from "react";
import React from "react";

export const WatchListContext = createContext();

export const WatchListContextProvider = (props) =>{
    const[watchList, setWatchList] = useState(["BTCUSD","ETHUSD"])

    return (
        <WatchListContext.Provider value ={{watchList}}>
            {props.children}
        </WatchListContext.Provider>
    )
}