export default class extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
    }
}