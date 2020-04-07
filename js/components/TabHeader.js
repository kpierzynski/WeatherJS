class TabHeader extends HTMLAnchorElement {
	constructor( headerName ) {
		super();
		
		this.id = "tab-" + headerName + "-header";
		this.classList.add( "list-group-item", "list-group-item-action" );
		this.setAttribute( "data-toggle", "list" );
		this.href = "#"+headerName;
		
		this.textTitle = document.createTextNode(headerName);
		this.appendChild(this.textTitle);
	}
}
