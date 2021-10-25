export default class extends HTMLElement {
    constructor() {
        super();
        for(const child of this.children) {
            child.onclick = (event) => event.target.requestFullscreen();
        }
    }
}