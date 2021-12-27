// Generates a random id anchor based on prefix, sequence length, and current index
// The anchor will never be to the current index, and (possibly) changes per click

const INIT_TEMPLATE = document.createElement("template");
INIT_TEMPLATE.innerHTML = `<a part="button" id="next">Random</a>`

export default class extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: "open"
        });
        this.shadowRoot.append(INIT_TEMPLATE.content.cloneNode("true"));
        const next = this.shadowRoot.getElementById("next");
        next.onclick = async (event) => {
            event.preventDefault();
            document.location = event.target.href;
            this.randomize();
        }
    }

    static get observedAttributes() {
        return ["data-prefix", "data-length", "data-index"];
    }

    randomize = ()=>{
        const next = this.shadowRoot.getElementById("next");
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

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
        case "data-index":
            // Technically you don't always need to change the
            // link on an index change, but I don't want to code that
        case "data-prefix":
        case "data-length":
            this.randomize();
        }
    }
}
