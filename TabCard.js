const weather_images = {
	"Clouds": 'https://images2.minutemediacdn.com/image/upload/c_crop,h_1193,w_2121,x_0,y_221/f_auto,q_auto,w_1100/v1555155296/shape/mentalfloss/iStock-104472907.jpg',
	"Atmosphere": 'https://www.metoffice.gov.uk/binaries/content/gallery/metofficegovuk/hero-images/weather/fog--mist/foggy-morning-in-a-meadow.jpg',
	"Thunderstorm": 'https://www.farmersalmanac.com/wp-content/uploads/2015/06/Best-Places-Cities-Lightning-A193502306.jpg',
	"Drizzle": 'https://www.shemazing.net/wp-content/uploads/2017/10/drizzle2_w630.jpg',
	"Rain": 'https://www.ekathimerini.com/resources/2019-07/rain-thumb-large1-thumb-large.jpg',
	"Snow": 'https://www.washingtonpost.com/resizer/8Y5bT44kWc-1x_cygdSCXr9hGUY=/1484x0/arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/HB4GLP6TRVGDPM4BLCOY6BBWA4.jpg',
	"Clear": 'https://previews.123rf.com/images/sutichak/sutichak1512/sutichak151200051/49045839-clear-weather-sky-sun-on-blue-sky-with-clouds-sun-rays-solar-of-clean-energy-power.jpg'
}

const default_image = "https://epoznan.pl/storage/gallery/59826/q9tn23hm3h6jjh8dtwr6h7qhz7893zxz_wm.jpg?1573064817";

HTMLElement.prototype.appendChilds = function(...childs) {
	Array.from(childs).forEach( (child) => this.appendChild(child) );
}

class TabCard extends HTMLDivElement {
	constructor( name, coords ) {
		super();
		this.id = name;
		this.classList.add( "card", "tab-pane", "fade" );
		
		this.imageTop = document.createElement( "img" );
		this.imageTop.classList.add( "card-img-top", "weather-image" );
		this.imageTop.src = default_image;
		this.cardBody = document.createElement( "div" );
		this.cardBody.classList.add( "card-body" );
		
		this.cardDescription = document.createElement( "p" );

		this.cardTitle = document.createElement( "h5" );
		this.cardTitle.appendChild( document.createTextNode( name ) );
		
		this.cardTemperature = document.createElement( "p" );
		this.cardTemperature.classList.add( "temperature-text", "text-right" );
		
		this.loader = document.createElement( "div" );
		this.loader.classList.add( "loader" ); //, "align-middle" );

		this.imgOverlayDiv = document.createElement( "div" );
		this.imgOverlayDiv.classList.add( "card-img-overlay" );

		this.closeButton = new CloseButton();
		this.closeButton.addEventListener( "click", () => this.close() )
		this.imgOverlayDiv.appendChild( this.closeButton );

		this.cardBody.appendChilds( this.cardTitle, this.cardDescription );
		this.imgOverlayDiv.appendChilds( this.cardTemperature, this.loader );
		this.appendChilds( this.imgOverlayDiv, this.imageTop, this.cardBody );

		if( coords != undefined ) { 
			const tabHeader = document.querySelector("#tab-" + name + "-header");
			getWeatherByCoords(coords.latitude, coords.longitude)
				.then( (data) => this.update(data, tabHeader) )
				.catch( () => this.error() );
		}
		else getWeatherByName(name)
			.then( (data) => this.update(data) )
			.catch( () => this.error() );
	}

	close() {
		this.parentNode.removeChild(this);

		const tabHeader = document.querySelector( "#tab-" + this.id + "-header" );
		tabHeader.parentNode.removeChild( tabHeader );
		$( "#tab-new-header" ).tab( "show" );
	}

	error() {
		this.imgOverlayDiv.removeChild( this.loader );
		this.cardDescription.appendChild( document.createTextNode("Error while loading town's weather") );
	}
	
	update(weather, tabHeader) {
		this.imgOverlayDiv.removeChild( this.loader );

		if( tabHeader != undefined ) {
			tabHeader.childNodes[0].textContent = weather.data.name;
			tabHeader.id = "tab-" + weather.data.name + "-header";
			tabHeader.href = "#"+ weather.data.name;
			this.id = weather.data.name;
		}

		this.cardTitle.childNodes[0].textContent = weather.data.name;
		this.cardTemperature.appendChild( document.createTextNode( Math.floor(weather.data.main.temp - 273.15) + " °C" ) );

		this.cardDescription.appendChilds( 
			document.createTextNode( "Actual weather: " + weather.data.weather[0].description ), 
			document.createElement( "br" ),
			document.createTextNode( "Wind: " + weather.data.wind.speed + "km/h" ) );
		
		let key;
		if( weather.data.weather[0].id >= 700 && weather.data.weather[0].id < 800 ) 
			key = "Atmosphere"
		else key = weather.data.weather[0].main
		this.imageTop.src = weather_images[key];
	}
}
customElements.define( "tab-card", TabCard, { extends: "div" } );
