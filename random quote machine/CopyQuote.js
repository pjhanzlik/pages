const INIT = document.createElement("template");
INIT.innerHTML = `<style>
[part=button]:disabled {
    opacity: 0;
}
</style>
<button part="button" type="button" disabled>Copy</button>`

export default class extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.append(INIT.content.cloneNode(true));
    }
}