import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import {ChartDot, ChartPath, ChartPathProvider, monotoneCubicInterpolation} from '@rainbow-me/animated-charts';
import { set } from "react-native-reanimated";


const Chart = ({history, selectedData})=>{

    const [chartData, setChartData] = useState([
        {time: '', price: ''}]);

    useEffect(()=> {
        for(let i = 0; i< history[0].length; i++){
            
            let data = {price: history[i][4], time: history[i][0]}
            setChartData(chartData =>[...chartData, data ] )
            
        }
        
    }, []);

    var realColors = chartData.filter(
        obj => !(obj && Object.values(obj).length === 0 && obj.constructor === Object)
      );
    console.log(realColors);
    return(
        <ChartPathProvider>
        <View>
            <Text></Text>
        </View>
        </ChartPathProvider>
    )
};

export default Chart;