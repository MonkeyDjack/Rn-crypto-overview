import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import {ChartDot, ChartPath, ChartPathProvider, monotoneCubicInterpolation} from '@rainbow-me/animated-charts';
import { set } from "react-native-reanimated";
import { Dimensions } from "react-native";
export const {width: SIZE} = Dimensions.get('window');


const Chart = ({history, onPress})=>{

    const [chartData, setChartData] = useState([
        {time: '', price: ''}]);

    useEffect(()=> {
        for(let i = 0; i< history[0].length; i++){
            
            const data = {price: history[i][4], time: history[i][0]}
            setChartData(chartData =>[...chartData, data] )
            console.log(chartData);
        }
        
    }, []);
        
    return(
        <ChartPathProvider data={{ points: chartData, smoothingStrategy: 'bezier' }}>
        <View>
            <Text></Text>
        </View>
        </ChartPathProvider>
    )
};

export default Chart;