// Generates a random id anchor based on prefix, sequence length, and current index
// The anchor will never be to the current index, and changes per click

const INIT_TEMPLATE = document.createElement("template");
INIT_TEMPLATE.innerHTML = `<style>
[part=button]:not([href]) {
    opacity: 0;
}
</style>
<a part="button" id="next">Random</a>`

export default class extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: "open"
        });
        this.shadowRoot.append(INIT_TEMPLATE.content.cloneNode("true"));
    }

    static get observedAttributes() {
        return ["data-prefix", "data-length", "data-index"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        const next = this.shadowRoot.getElementById("next");
        switch (name) {
        case "data-index":
        case "data-prefix":
        case "data-length":
            if (!Number.isNaN(this.dataset.length)) {
                if (this.dataset.prefix) {
                    next.href = this.dataset.prefix;
                }
                if (!Number.isNaN(this.dataset.index)) {
                    const index = Number.parseInt(this.dataset.index);
                    const range = Number.parseInt(this.dataset.length - 1);
                    const door = Math.floor(Math.random() * range);
                    next.href += door === index ? range : door;
                } else {
                    const length = Number.parseInt(this.dataset.length);
                    next.href += Math.floor(Math.random() * roof);
                }
            }
        }
    }
}
