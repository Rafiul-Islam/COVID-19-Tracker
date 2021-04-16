import React from 'react';
import {Card, CardContent, Typography} from "@material-ui/core";
import './App.css'

const InfoBox = ({title, total, cases}) => {
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
                {cases && <h3 className={cn1}>+{cases}</h3>}
                {cases < 1 && <h3 className={cn1}>0 Cases</h3>}
                <h3 className="infoBox__total">{(total / 1000).toFixed(1)}k Total</h3>
            </CardContent>
        </Card>
    );
};

export default InfoBox;
