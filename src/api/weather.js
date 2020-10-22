import axios from 'axios'

const API_KEY = '838137af699d746b4a0571035fc5a340'

class WeatherApiClient {
  constructor() {
    this.instance = axios.create({
      baseURL: 'https://api.openweathermap.org/data/2.5',
    })
  }
}

export default WeatherApiClient
