const INIT_TEMPLATE = document.createElement("template");
INIT_TEMPLATE.innerHTML = `<style>
slot {
    scroll-snap-type: x mandatory;
    overflow-x: scroll;
    display: grid;
    grid-auto-flow: column;
    gap: 1em;
    grid-auto-columns: 240px;
    width: 240px;
}
::slotted(*) {
    background-color: blue;
    scroll-snap-align: center;
}
</style>
<slot></slot>`;

export default class extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.append(INIT_TEMPLATE.content.cloneNode(true))
    }
}