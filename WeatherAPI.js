const KEY = 'b03512d60202825c9fbc4ff343a3ea60'
const url = 'https://api.openweathermap.org/data/2.5'

async function delay(ms) {
	return new Promise( (resolve, reject) => {
		setTimeout( resolve, ms );
	})
} 

async function getWeatherByCoords( lat, lon ) {

	await delay(3000);
	return await axios.get( url + "/weather", {
		params: {
			lat: lat,
			lon: lon,
			appid: KEY
		}
	});
}

async function getWeatherByName( name ) {

	await delay(3000);
	return await axios.get( url + "/weather", {
		params: {
			q: name,
			appid: KEY
		}
	});
}
