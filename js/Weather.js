const tabs = document.querySelector("#tab-list");
const tabsContent = document.querySelector("#tab-list-content");
const createNew = document.querySelector("#new-town");

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
		const position = await LocalizationService.getGeoLocation();

		tabs.appendChild( new TabHeader("GeoLocalization") );
		tabsContent.appendChild( new TabCard("GeoLocalization", position.coords) );
	} catch( error ) {
		throw new Error("Unable to get localization.");
	}
}

window.addEventListener("load", setup );
