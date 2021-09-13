import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { set } from "react-native-reanimated";
import {Dimensions} from 'react-native';
import {ChartDot, ChartPath, ChartPathProvider, monotoneCubicInterpolation} from '@rainbow-me/animated-charts';

export const {width: SIZE} = Dimensions.get('window');


const Chart = ({history, selectedData})=>{

    const [chartData, setChartData] = useState([
        {time: '', price: ''}]);

    const [filterData, setFilterData] = useState([
        {time: '', price: ''}]);

    useEffect(()=> {
        for(let i = 0; i< history[0].length; i++){
            
            let data = {price: history[i][4], time: history[i][0]}
            setChartData(chartData =>[...chartData, data]);
        }
        var fData = chartData.filter(function(obj){
            return obj.price !== "" || obj.time !== "";
        });
        setFilterData(filterData => [...filterData, fData]);
        
        console.log(filterData);
        
    }, []);
;
    return(
        <ChartPathProvider>
        <View>
            <Text>{selectedData.currency}</Text>
            {filterData ?(
            <Text>Time: {filterData[20].price}</Text>
            ):null}


        </View>
            
        </ChartPathProvider>
    )
};

export default Chart;