export default class extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.append(
            this.constructor.initialTemplate.content.cloneNode("true")
        );
        this.shadowRoot.append(
            this.constructor.dialogTemplate.content.cloneNode("true")  
        );
        for(const anchor of this.getElementsByTagName("a")) {
            const icon = this.constructor.iconTemplate.content.cloneNode("true");
            icon.firstElementChild.append(anchor.textContent);
            icon.firstElementChild.style.backgroundImage = `url("${anchor.dataset.icon}")`;
            icon.firstElementChild.dataset.page = anchor.href;
            icon.firstElementChild.onclick = this.iconClick;

            this.shadowRoot.append(icon);
        }
    }

    iconClick = (event) => {
        this.dialog = this.shadowRoot.getElementById('dialog');
        this.dialog.src = event.currentTarget.dataset.page;
        this.dialog.title = event.currentTarget.textContent;
        this.dialog.requestFullscreen();
    }

    static {
      this.initialTemplate = document.createElement("template");
      this.initialTemplate.innerHTML = `<style>
        #dialog {
            background: var(--dialog-background, white);
            display: none;
            grid-column: 1 / -1;
            width: 100%;
        }
        #dialog[src] {
            display: initial;
        }
        .icon {
            background-repeat: no-repeat;
            width: var(--icon-length);
            height: var(--icon-length);
            color: transparent;
        }
        :host {
            --icon-length: 7rem;
            display: grid;
            grid-template-columns: repeat(auto-fill, var(--icon-length));
            gap: 1rem;
            place-items: center;
            place-content: center;
            background: gainsboro;
            
        }
      </style>`;

      this.dialogTemplate = document.createElement("template");
      this.dialogTemplate.innerHTML = `<iframe id="dialog" width="240" height="200">`;

      this.iconTemplate = document.createElement("template");
      this.iconTemplate.innerHTML = `<button class="icon" type="button"></button>`;
    }
}