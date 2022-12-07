import { cleanup } from '@testing-library/react';
import React, { useState, useEffect } from 'react';

const api = {
  key: "5ba3cd1a540ff877629673a2ab7be868",
  base: "https://pro.openweathermap.org/data/2.5/",
};



function App() {

    const [searchInput, setSearchInput] = useState("");
    const [searchCity, setSearchCity] = useState("");
    const [weatherInfo, setWeatherInfo] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
   
    useEffect(() => {
        const fetchWeatherData = async () => {
            if (!searchCity) return;
            setLoading(true);
            //Process
            try {
                const url = `${api.base}forecast/hourly?q=${searchCity}&appid=${api.key}`
                const response = await fetch(url);
                const data = await response.json();
                setWeatherInfo(JSON.stringify(data))
            } catch (error) {
                setErrorMessage(error.message);
            }
            setLoading(false);
        };
        fetchWeatherData();

    }, [searchCity]);


    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchCity(searchInput);
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder='City'
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)} />
                <button>Search</button>
            </form>
            <div>{weatherInfo}</div>
        </>
    );
};

export default App;