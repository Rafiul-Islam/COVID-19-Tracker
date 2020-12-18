import React from 'react';
import {Card, CardContent, Typography} from "@material-ui/core";
import './App.css'

const InfoBox = ({title, total}) => {
    let cn0 = 'rounded infoBox__cardContent_border'
    let cn1 = 'my-2 infoBox__cardContent_border'
    if (title === 'Cases'){
        cn0 += '_cases'
        cn1 += '_cases_text'
    }
    if (title === 'Recovered'){
        cn0 += '_recovers'
        cn1 += '_recovers_text'
    }
    if (title === 'Deaths'){
        cn0 += '_deaths'
        cn1 += '_deaths_text'
    }
    return (
        <Card className='infoBox'>
            <CardContent className={cn0}>
                <span className='infoBox__title'>{title}</span>
                <h3 className={cn1}>+{total / 1000}k</h3>
            </CardContent>
        </Card>
    );
};

export default InfoBox;
