class LocalizationService {
	static getGeoLocation() {
		return new Promise( (resolve, reject) => {
			if( "geolocation" in navigator )
				navigator.geolocation.getCurrentPosition( (pos) => resolve(pos), (error) => reject(error) );
		});
	}
}
