export default class extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.append(
            this.constructor.initialTemplate.content.cloneNode("true")
        );

        const windows = this.shadowRoot.getElementById("windows");
        windows.onslotchange = (event) => {
            event.target
        }
    }
    
    fullscreenSlot = (event) => {
        this.shadowRoot.querySelector("slot").requestFullscreen();
    }

    static {
        this.initialTemplate = document.createElement("template");
        this.initialTemplate.innerHTML = `<style>
        </style>
        <slot id="windows" name="expandable"></slot>`
        this.fullscreenButton = document.createElement("template");
        this.fullscreenButton.innerHTML = `<button>Fullscreen</button>`
    }
}