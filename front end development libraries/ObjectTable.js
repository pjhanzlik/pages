const INIT_TEMPLATE = document.createElement("template");
INIT_TEMPLATE.innerHTML = `<style>
@media screen, print {
}
</style>
<slot name="caption"></slot>`;

export default class extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: "open"
        });
        this.shadowRoot.append(INIT_TEMPLATE.content.cloneNode(true));
    }

    static get observedAttributes() {
        return ["data-json"];
    }

    fetchJSON = async (url) => {
        try {
            const blarg = await fetch("https://developer.mozilla.org/en-US/docs/Web/API/fetch");
            console.debug(blarg);
        }
        catch(e) {
            console.debug(e);
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch(name) {
            case "data-json":
                this.fetchJSON(newValue);
        }
    }
}
