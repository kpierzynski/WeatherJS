HTMLElement.prototype.appendChilds = function(...childs) {
	Array.from(childs).forEach( (child) => this.appendChild(child) );
}

customElements.define( "close-button", CloseButton, { extends: "button" } );
customElements.define( "tab-card", TabCard, { extends: "div" } );
customElements.define( "tab-header", TabHeader, { extends: "a" } );
