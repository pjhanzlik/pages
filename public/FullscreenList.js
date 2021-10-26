const PAGE_BUTTON = document.createElement("template");
PAGE_BUTTON.innerHTML = `<button type="button">
</button>`;

export default class extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = '<iframe width="200" height="200">'
        for(const anchor of this.getElementsByTagName("a")) {
            const pageButton = document.createElement("button");
            pageButton.append(anchor.firstElementChild);
            pageButton.dataset.page = anchor.href;
            pageButton.type = "button";
            pageButton.onclick = (event) => {
                this.shadowRoot.firstElementChild.src = event.currentTarget.dataset.page;
                this.shadowRoot.firstElementChild.requestFullscreen();
            }

            this.shadowRoot.append(pageButton);

            
        }
    }
}