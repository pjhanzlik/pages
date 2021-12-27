const TEMPLATE = document.createElement("template");
TEMPLATE.innerHTML = `<button part="button" type="button" id="share-button" disabled>Share</button>`;

export default class extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: "open"
        });
        this.shadowRoot.append(TEMPLATE.content.cloneNode(true));
        const shareButton = this.shadowRoot.getElementById("share-button");
        shareButton.onclick = async()=>{
            const quote = document.getElementById(this.dataset.quote)
            navigator.share({
                title: quote.title,
                text: quote.textContent,
                url: quote.cite
            })
        }
    }

    static get observedAttributes() {
        return ["data-quote"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        const shareButton = this.shadowRoot.getElementById("share-button");
        if(newValue) {
            shareButton.disabled = false;
            shareButton.setAttribute("aria-details", this.dataset.quote);
        }
        else {
            shareButton.disabled = true;
            shareButton.removeAttribute("aria-details");
        }
    }
}
