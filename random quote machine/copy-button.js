if(navigator.clipboard) {
    const copyImport = await import("./CopyQuote.js");
    customElements.define("copy-button", copyImport.default);
}