export default class extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.append(
            this.constructor.initialTemplate.content.cloneNode("true")
        );

        this.dialog = this.shadowRoot.getElementById('dialog');
        this.fullscreen = this.shadowRoot.getElementById('fullscreen');
        this.pages = this.shadowRoot.getElementById('pages');

        this.pages.onchange = this.viewPage;
        this.fullscreen.onclick = this.fullscreenPage;

        const anchors = this.querySelectorAll('a[href]') 
        this.initIcons(anchors);
        this.dialog.src = anchors[0].href;
        this.dialog.title = anchors[0].textContent;
    }

    viewPage = async (event) => {
        this.dialog.src = event.currentTarget.value;
        this.dialog.title = event.currentTarget.textContent;
    }

    initIcons = async (anchors) => {
        const options = anchors.forEach((anchor) => {
            const option = document.createElement("option");
            option.textContent = anchor.textContent;
            option.value = anchor.href;
            this.pages.append(option);
        })
    }

    fullscreenPage = async (event) => {
        const response = await this.dialog.requestFullscreen();
    }

    static {
      this.initialTemplate = document.createElement("template");
      this.initialTemplate.innerHTML = `<style>
      </style>
      <fieldset>
        <legend>Preview Page</legend>
        <select id="pages"></select>
        <iframe id="dialog" width="240" height="200"></iframe>
        <button type="button" id="fullscreen">Fullscreen</button>
      </fieldset>`;

      this.iconTemplate = document.createElement("template");
      this.iconTemplate.innerHTML = `<label>
      <input type="radio" name="page">
      </label>`
    }
}