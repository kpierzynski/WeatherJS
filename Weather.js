const tabs = document.querySelector("#tab-list");
const tabsContent = document.querySelector("#tab-list-content");
const createNew = document.querySelector("#new-town");

function getGeoLocation() {
	return new Promise( (resolve, reject) => {
		if( "geolocation" in navigator )
			navigator.geolocation.getCurrentPosition( (pos) => resolve(pos), (error) => reject(error) );
	});
}

createNew.addEventListener("submit", (event) => {
	event.preventDefault();

	let canCreate = true;
	tabs.childNodes.forEach( (item) => {
		if( item.id === "tab-" + event.target[0].value + "-header" ) { 
			$("#"+"tab-" + event.target[0].value + "-header").tab("show");
			canCreate = false;
		}
	});
	if( !canCreate ) return;

	const tab = new TabHeader(event.target[0].value);
	tabs.appendChild( tab );
	tabsContent.appendChild( new TabCard(event.target[0].value) );
	$("#"+tab.id).tab("show");
	
	event.target[0].value = "";
	
});

async function setup() {

	try {
		const position = await getGeoLocation();

		tabs.appendChild( new TabHeader("GeoLocalization") );
		tabsContent.appendChild( new TabCard("GeoLocalization", position.coords) );
	} catch( error ) {
		console.log("Unable to get geo position.");
	}
}

window.addEventListener("load", setup );
