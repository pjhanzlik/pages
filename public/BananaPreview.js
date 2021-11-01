export default class extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.append(
            this.constructor.initialTemplate.content.cloneNode("true")
        );
        this.overlayResizeObserver = new ResizeObserver(this.resizeGrid);

        const features = this.shadowRoot.querySelector('slot[name="feature"]');
        const preview = this.shadowRoot.querySelector('slot[name="previewer"]');
        this.overlayResizeObserver.observe(preview);

        for(const feature of features.children) {
            feature.setAttribute(target, "banana-phone");
        }
        features.addEventListener("mouseover", this.loadfeature);
        features.addEventListener('focusin', this.loadfeature);
    }

    resizeGrid = (entries) => {
        for(const entry of entries) {
            this.style.setProperty("--preview-height", `${entry.contentRect.height}px`);
            this.style.setProperty("--preview-width", `${entry.contentRect.width}px`);
            console.log(entry);
        }
    }

    loadfeature = (event) => {
        const targetedAnchor = event.composedPath().find((ele) => (ele.href && ele.target));
        if(targetedAnchor) {
            targetedAnchor.click();
            const blarg = this.shadowRoot.getElementById("blarg");
            blarg.style.top = `${targetedAnchor.offsetTop}px`;
        }
    }

    static {
      this.initialTemplate = document.createElement("template");
      this.initialTemplate.innerHTML = `<style>
      slot[name="feature"] {
          display: grid;
          gap: 2em;
          grid-auto-rows: var(--preview-height, none);
          grid-template-columns: repeat( auto-fill, var(--preview-width, auto));
      }
      slot[name="previewer"] {
          display: grid;
          position: absolute;
      }
      </style>
      <slot id="test" name="feature"></slot>
      <slot id="blarg" name="previewer"></slot>`
    }
}