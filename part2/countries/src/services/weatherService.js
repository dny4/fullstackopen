import axios from "axios";

const api_key = import.meta.env.VITE_WHEATHER_API_KEY
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?'

const getCurrentWeather = (city) => {
    const url =`${baseUrl}q=${city}&units=metric&appid=${api_key}` 
    const request = axios.get(url)
    return request
        .then(response => response.data)
}

export default {
    getCurrentWeather,
}
