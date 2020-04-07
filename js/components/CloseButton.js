class CloseButton extends HTMLButtonElement {
	constructor() {
		super();

		this.classList.add( "close" );
		this.setAttribute( "type", "button" );

		this.closeSpan = document.createElement( "span" );
		this.closeSpan.appendChild (document.createTextNode( "\u00d7" ));

		this.appendChild( this.closeSpan );
	}
}
