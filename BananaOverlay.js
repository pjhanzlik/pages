export default class extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.append(
            this.constructor.initialTemplate.content.cloneNode("true")
        );
    }

    static {
      this.initialTemplate = document.createElement("template");
      this.initialTemplate.innerHTML = `<style>
      </style>
      <slot id="viewport"></slot>
      <button type="button" part="fullscreen" id="fullscreen">Fullscreen</button>
      <button type="button" part="blur" id="blur">Blur</button>
      <button type="button" part="grayscale" id="grayscale">Grayscale</button>`
    }
}