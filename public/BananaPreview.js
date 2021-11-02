export default class extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.append(
            this.constructor.initialTemplate.content.cloneNode("true")
        );
        const viewportResizeObserver = new ResizeObserver(this.resizeIcons);

        const icons = this.shadowRoot.getElementById("icons");
        const viewport = this.shadowRoot.getElementById("viewport");
        viewportResizeObserver.observe(viewport);       

        icons.addEventListener("mouseover", this.clickLoadTargetedAnchor, {passive: true});
        icons.addEventListener('focusin', this.clickLoadTargetedAnchor, {passive: true});
    }

    resizeIcons = (entries) => {
        const icons = this.shadowRoot.getElementById("icons");
        for(const entry of entries) {
            icons.style.setProperty("grid-auto-rows", `${entry.contentRect.height}px`);
            icons.style.setProperty("grid-template-columns", "240px 240px");
        }
    }

    clickLoadTargetedAnchor = (event) => {
        const targetedAnchor = event.composedPath().find((ele) => (ele.href && ele.target));
        if(targetedAnchor) {
            const viewport = this.shadowRoot.getElementById("viewport");
            const target = this.querySelector(`[name="${targetedAnchor.target}"]`);
            const left = targetedAnchor.offsetLeft - this.offsetLeft;
            const top = targetedAnchor.offsetTop - this.offsetTop;
            viewport.style.transform = `translate(${left}px, ${top}px)`;
            targetedAnchor.click();

            // block flash of previous content
            target.style.opacity = 0;
            target.addEventListener("load", this.constructor.reveal, {once: true, passive: true});
        }
    }

    static {
      this.reveal = (event) => {
          event.target.style.opacity = 1;
      }

      this.initialTemplate = document.createElement("template");
      this.initialTemplate.innerHTML = `<style>
      #icons {
          display: grid;
          gap: 2em;
      }
      #viewport {
          display: grid;
          position: absolute;
      }
      </style>
      <slot id="icons" name="icon"></slot>
      <slot id="viewport" name="interface"></slot>`
    }
}