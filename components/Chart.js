import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { set } from "react-native-reanimated";
import {Dimensions} from 'react-native';
import {ChartDot, ChartPath, ChartPathProvider, monotoneCubicInterpolation} from '@rainbow-me/animated-charts';

import {VictoryScatter, VictoryLine, VictoryChart, VictoryAxis } from "victory-native";
import { ThemeWatchListContext } from "./context/themeWatchList";
import darkMode from "./css/darkMode";

import krakenApi from "./api/krakenApi";

export const {width: SIZE} = Dimensions.get('window');


const Chart = ({symbol})=>{

    const [chartData, setChartData] = useState({day: [], week: []});
    const [filteredData, setFilteredData] = useState([{time: 0, price: 0}])
    const [isLoading, setIsLoading] = useState(false);
    const {theme} = useContext(ThemeWatchListContext);
    var myDate = new Date();
    myDate.setHours(myDate.getHours()-24);
    const oneDay = Math.floor(myDate.getTime()/1000)
    myDate.setHours(myDate.getHours()-144)
    const oneWeek = Math.floor(myDate.getTime()/1000)
        
console.log('-----------------')
            
        useEffect(()=>{
            const fetchData = async() => {
                setIsLoading(true);

                const[day, week] = await Promise.all([
                    krakenApi.get(`/OHLC/?pair=${symbol}`, {
                        params: {
                            since: oneDay
                        },
                    }),
                    krakenApi.get(`/OHLC/?pair=${symbol}`, {
                        params: {
                            since: oneWeek
                        },
                    }),
            ]);
            
                setChartData({
                    day: day.data.result[symbol],
                    week: week.data.result[symbol]
                });
                for(let i = 0; i< chartData.day.length; i++){
                    setFilteredData(filteredData=>[...filteredData, {time: chartData.day[i][0], price: parseFloat(chartData.day[i][4])}])
                    
                }
                
                filteredData.shift()
                setIsLoading(false);
            }
            if(chartData !== null){
                fetchData();
                console.log(filteredData)
            }else{
                setChartData([])
            }
        }, [symbol])

        


        const renderChart = () =>{
            if(isLoading){
                return <Text>Loading...</Text>
            }

            return(
                <Text style={theme === 'light'?styles.testTheme: darkMode.testTheme}>{symbol}</Text>
            )
        };
    return renderChart()
};

const styles = StyleSheet.create({
    testTheme:{
        backgroundColor: '#fff',
        color: '#eee'
    }
})

export default Chart;