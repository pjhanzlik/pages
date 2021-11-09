export default class extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.append(
            this.constructor.initialTemplate.content.cloneNode("true")
        );
        const fullscreenButton = this.shadowRoot.getElementById("fullscreen");
        fullscreenButton.onclick = this.fullscreenShadowDOM;
        if(document.fullscreenEnabled) {
            fullscreenButton.disabled = false;
        }

        const grayscaleButton = this.shadowRoot.getElementById("grayscale");
        grayscaleButton.onchange = this.tyrannicallyFilter;

        const blurButton = this.shadowRoot.getElementById("blur");
        blurButton.onchange = this.tyrannicallyFilter;
    }

    fullscreenShadowDOM = (event) => {
        if(document.fullscreenElement) {
            document.exitFullscreen();
        }
        else {
            this.requestFullscreen();
        }
    }

    tyrannicallyFilter = (event) => {
        const filter = []
        if(this.shadowRoot.getElementById("blur").checked) filter.push("blur(2px)");
        if(this.shadowRoot.getElementById("grayscale").checked) filter.push("grayscale(100%)");
        this.style.filter = filter.join(" ");
    }

    static {
      this.initialTemplate = document.createElement("template");
      this.initialTemplate.innerHTML = `<slot></slot>
      <input role="switch" type="checkbox" part="switch blur" id="blur"></input>
      <label part="blur label" for="blur">Blur</label>
      <input role="switch" type="checkbox" part="switch grayscale" id="grayscale"></input>
      <label part="grayscale label" for="grayscale">Grayscale</label>
      <button part="fullscreen button" type="button" id="fullscreen">Fullscreen</button>`
    }
}