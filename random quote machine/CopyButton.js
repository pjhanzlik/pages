const INIT = document.createElement("template");
INIT.innerHTML = `<style>
[part=button]:disabled {
    opacity: 0;
}
[part=button]:active:hover::after {
    content: "ing";
}
</style>
<button id="the-button" part="button" type="button" disabled>Copy</button>`

export default class extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.append(INIT.content.cloneNode(true));
        const theButton = this.shadowRoot.getElementById("the-button");
        theButton.onclick = async () => {
            try {
                await navigator.clipboard.writeText(this.dataset.writeText);
            }
            catch(e) {
                console.debug(e);
            }
        }
    }

    static get observedAttributes() {
        return ["data-write-text"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        const theButton = this.shadowRoot.getElementById("the-button");
        if(newValue) {
            theButton.disabled = false;
            theButton.setAttribute("aria-description", newValue);
        }
        else {
            theButton.disabled = true;
            theButton.removeAttribute("aria-description");
        }
    }
}