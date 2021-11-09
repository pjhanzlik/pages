const INITIAL_TEMPLATE = document.createElement("template");
INITIAL_TEMPLATE.innerHTML = `<button part="button" id="fullscreen" type="button">Fullscreen</button>`

export default class extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.append(
            INITIAL_TEMPLATE.content.cloneNode("true")
        );
        const button = this.shadowRoot.getElementById("fullscreen");
        button.onclick = (event) => {
            this.target.requestFullscreen();
        }
    }

    static observedAttributes = ["data-target"];

    attributeChangedCallback(name, oldValue, newValue) {
        this.target = document.getElementsByName(newValue)[0];
    }
}