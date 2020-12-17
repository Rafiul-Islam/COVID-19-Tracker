import React, {useEffect, useState} from 'react';
import {Line} from "react-chartjs-2";
import * as axios from "axios";

const LineGraph = () => {
    const api_endPoint = 'https://disease.sh/v3/covid-19/historical/all?lastdays=120'
    const [data1, setData1] = useState({})

    useEffect(() => {
        const getDataForGraph = async () => {
            const {data} = await axios(api_endPoint)
            setData1(data)
            console.log(data1)
        }
        getDataForGraph()
    }, [])

    return (
        <div>
            <Line
                data={data1}
                // options={}
            />
        </div>
    );
};

export default LineGraph;
