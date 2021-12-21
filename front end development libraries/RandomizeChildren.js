// Watch for slotchange, append slot whenever two or more children are present randomly and fill with one guy

const INIT_TEMPLATE = document.createElement("template");
INIT_TEMPLATE.innerHTML = `<slot name="previous"></slot>
<slot name="current"></slot>
<slot></slot>`;

export default class extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.append(INIT_TEMPLATE.content.cloneNode(true))
    }
}