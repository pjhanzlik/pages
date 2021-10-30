export default class extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.append(
            this.constructor.initialTemplate.content.cloneNode("true")
        );

        const hypertext = this.shadowRoot.querySelector('slot[name="hypertext"]');
        hypertext.addEventListener("mouseover", this.loadPreview);
        hypertext.addEventListener('focusin', this.loadPreview);      
        hypertext.addEventListener("click", this.fullscreenPreview);
    }

    loadPreview = async (event) => {
        const preview = this.shadowRoot.getElementById("preview");
        const anchor = event.composedPath().find((ele) => ele.slot === 'hypertext');
        
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
      }
      #preview {
          display: none;
      }
      @media screen {
          #preview {
              background: var(--preview-background, white);
          }

          #preview[src][title]:fullscreen,
          slot[name="hypertext"]:focus-within + #preview[src][title],
          slot[name="hypertext"]:hover + #preview[src][title] {
              display: initial;
          }
      }
      </style>
      <slot name="hypertext">
      </slot>
      <iframe id="preview" width="240" height="320"></iframe>`;
    }
}