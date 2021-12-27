if(navigator.canShare) {
    const shareImport = await import("./ShareQuote.js");
    customElements.define("share-button", shareImport.default);
}