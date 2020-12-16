import {useEffect, useState} from "react";
import {FormControl, InputLabel, Select, MenuItem, Card, CardContent} from "@material-ui/core";
import * as axios from "axios";
import InfoBox from "./InfoBox";
import Map from "./Map";
import './App.css';

function App() {
    const all_counties_api = 'https://disease.sh/v3/covid-19/countries'
    const [countries, setCountries] = useState([])
    const [country, setCountry] = useState('worldwide')
    const [countryInfo, setCountryInfo] = useState({})

    useEffect(async () => {
        const {data} = await axios('https://disease.sh/v3/covid-19/all');
        setCountryInfo(data)
    }, [])

    useEffect(() => {
        const getCountriesData = async () => {
            const {data} = await axios(all_counties_api);
            const countries = data.map((country) => ({
                name: country.country,
                value: country.countryInfo.iso2
            }))
            setCountries(countries)
        }
        getCountriesData()
    }, []);

    const onCountryChange = (event) => {
        const countryCode = event.target.value
        const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : `${all_counties_api}/${countryCode}`
        const getCountryData = async () => {
            const {data} = await axios(url);
            setCountry(countryCode)
            setCountryInfo(data)
        }
        getCountryData()
    }

    return (
        <div className='app row m-5'>
            <div className="app__left col-md-9">
                <div className="app__header d-flex flex-wrap justify-content-between align-self-center">
                    <h1>Covid-19 Tracker App</h1>
                    <FormControl variant="outlined">
                        <Select labelId="countries-dropdown-label" id="countries-dropdown" value={country}
                                onChange={onCountryChange}>
                            <MenuItem value='worldwide'>Worldwide</MenuItem>
                            {
                                countries.map((country, index) =>
                                    <MenuItem
                                        key={index}
                                        value={country.value}
                                    >
                                        {country.name}
                                    </MenuItem>
                                )
                            }
                        </Select>
                    </FormControl>
                </div>
                <div className='app__states d-flex flex-wrap justify-content-between align-self-center'>
                    <InfoBox title='Coronavirus cases' cases={countryInfo.todayCases} total={countryInfo.cases}/>
                    <InfoBox title='Recovered' cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>
                    <InfoBox title='Deaths' cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
                </div>
                <Map/>
            </div>
            <div className="app_right col-md-3">
                <Card>
                    <CardContent>
                        <h3>Live Cases By Country</h3>
                        <h3>Worldwide New Cases</h3>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}


export default App;
