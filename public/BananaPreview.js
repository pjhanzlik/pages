export default class extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.append(
            this.constructor.initialTemplate.content.cloneNode("true")
        );

        const previews = this.shadowRoot.querySelector('slot[name="preview"]');
        previews.addEventListener("mouseover", this.loadPreview);
        previews.addEventListener('focusin', this.loadPreview);      
        previews.addEventListener("click", this.fullscreenPreview);
    }

    loadPreview = async (event) => {
        const preview = this.shadowRoot.getElementById("preview");
        const anchor = event.composedPath().find((ele) => ele.href);
        
        if(anchor.href && preview.src != anchor.href) {
            preview.src = anchor.href;
            preview.title = anchor.textContent;
        }
    }

    fullscreenPreview = async (event) => {
        event.preventDefault();
        this.shadowRoot.getElementById("preview").requestFullscreen();
    }

    static {
      this.initialTemplate = document.createElement("template");
      this.initialTemplate.innerHTML = `<style>
      :host {
          display: grid;
          place-items: center;
          grid-auto-rows: 320px;
          grid-auto-columns: 240px;
          grid-template-columns: repeat( auto-fill, minmax(240px, 1fr) );
      }
      @media screen {
          #preview {
              background: var(--preview-background, white);
          }
      }
      </style>
      <slot name="preview"></slot>
      <iframe title="Previewed Page" id="preview" width="240" height="320"></iframe>`;
      this.triggerTemplate = document.createElement("template");
      this.triggerTemplate.innerHTML = `<label>
        <input type="radio" name="preview">
      </label>`
    }
}