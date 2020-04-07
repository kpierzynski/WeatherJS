const URL = 'https://api.openweathermap.org/data/2.5'

class WeatherService {

	static async getWeatherByCoords( lat, lon ) {
		return await axios.get( `${URL}/weather`, {
			params: {
				lat: lat,
				lon: lon,
				appid: KEY
			}
		});
	}

	static async getWeatherByName( name ) {
		return await axios.get( `${URL}/weather`, {
			params: {
				q: name,
				appid: KEY
			}
		});
	}
}
