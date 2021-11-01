export default class extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.append(
            this.constructor.initialTemplate.content.cloneNode("true")
        );

        const slot = this.shadowRoot.querySelector("slot");
        slot.onclick = this.fullscreenSlot;
    }
    
    fullscreenSlot = (event) => {
        this.shadowRoot.querySelector("slot").requestFullscreen();
    }

    static {
        this.initialTemplate = document.createElement("template");
        this.initialTemplate.innerHTML = `<style>
        </style>
        <slot></slot>`
    }
}