import { createContext, useState } from "react";
import React from "react";

export const ThemeWatchListContext = createContext();

export const ThemeWatchListContextProvider = (props) =>{
    const[theme, setTheme] = useState('dark');

    return (
        <ThemeWatchListContext.Provider value ={{theme}}>
            {props.children}
        </ThemeWatchListContext.Provider>
    )
}