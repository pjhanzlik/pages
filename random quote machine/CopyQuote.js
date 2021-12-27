const INIT = document.createElement("template");
INIT.innerHTML = `<button id="copy-button" part="button" type="button" disabled>Copy</button>`

export default class extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.append(INIT.content.cloneNode(true));
        const copyButton = this.shadowRoot.getElementById("copy-button");
        copyButton.onclick = async () => {
            const quote = document.getElementById(this.dataset.quote);
            navigator.clipboard.writeText(`${quote.textContent} ${quote.cite}`);
        }
    }

    static get observedAttributes() {
        return ["data-quote"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        const copyButton = this.shadowRoot.getElementById("copy-button");
        if(newValue) {
            copyButton.disabled = false;
            copyButton.setAttribute("aria-details", this.dataset.quote);
        }
        else {
            copyButton.disabled = true;
            copyButton.removeAttribute("aria-details");
        }
    }
}