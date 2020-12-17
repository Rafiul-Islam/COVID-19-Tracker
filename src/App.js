import {useEffect, useState} from "react";
import {FormControl, InputLabel, Select, MenuItem, Card, CardContent} from "@material-ui/core";
import * as axios from "axios";
import InfoBox from "./InfoBox";
import Table from "./Table";
import Map from "./Map";
import './App.css';
import LineGraph from "./LineGraph";
import 'leaflet/dist/leaflet.css'

function App() {
    const all_counties_api = 'https://disease.sh/v3/covid-19/countries'
    const [countries, setCountries] = useState([])
    const [tableData, settableData] = useState([])
    const [country, setCountry] = useState('worldwide')
    const [countryInfo, setCountryInfo] = useState({})
    const [mapCountries, setMapCountries] = useState([]);
    const [mapCenter, setMapCenter] = useState({
        lat: 34.80746,
        lng: -40.4796
    })
    const [mapZoom, setMapZoom] = useState(3)
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
            setMapCountries(data)
            settableData(data)
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
            setMapCenter([data.countryInfo.lat, data.countryInfo.long])
            setMapZoom(4)
        }
        getCountryData()
    }

    return (
        <div className='app row m-5'>
            <div className="app__left col-md-9">
                <div className="app__header d-flex flex-wrap justify-content-between align-self-center">
                    <h2>Covid-19 Tracker</h2>
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
                <div className='app__states row justify-content-between align-self-center text-center'>
                    <div className="flex-grow-1 m-sm-2">
                        <InfoBox title='Coronavirus cases'
                                 cases={countryInfo.todayCases}
                                 total={countryInfo.cases}/>
                    </div>
                    <div className="flex-grow-1 m-sm-2">
                        <InfoBox title='Recovered' cases={countryInfo.todayRecovered}
                                 total={countryInfo.recovered}/>
                    </div>
                    <div className="flex-grow-1 m-sm-2">
                        <InfoBox title='Deaths' cases={countryInfo.todayDeaths}
                                 total={countryInfo.deaths}/>
                    </div>
                </div>
                <Map countries={mapCountries} center={mapCenter} zoom={mapZoom}/>
            </div>
            <div className="app_right col-md-3">
                <Card>
                    <CardContent>
                        <h5>Live Cases By Country</h5>
                        <Table tableData={tableData}/>
                        <h5 className='mt-3'>Worldwide New Cases</h5>
                        <LineGraph/>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}


export default App;
