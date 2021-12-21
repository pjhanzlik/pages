const TEMPLATE = document.createElement("template");
TEMPLATE.innerHTML = `<style>
[part=button]:disabled {
    opacity: 0;
}
</style>
<button part="button" type="button" disabled>Share</button>`;


export default class extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.append(TEMPLATE.content.cloneNode(true));
    }
}