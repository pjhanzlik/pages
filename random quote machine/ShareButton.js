const TEMPLATE = document.createElement("template");
TEMPLATE.innerHTML = `<style>
[part=button]:disabled {
    opacity: 0;
}
[part=details] {
    display: none;
}
</style>
<figure part="details" id="the-details">
    <a></a>
    <figcaption></figcaption>
</figure>
<button part="button" type="button" id="the-button" disabled aria-details="the-details">Share</button>`;

export default class extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: "open"
        });
        this.shadowRoot.append(TEMPLATE.content.cloneNode(true));
        const theButton = this.shadowRoot.getElementById("the-button");
        theButton.onclick = async()=>{
            try {
                await navigator.share({
                    text: this.dataset.text,
                    title: this.dataset.title,
                    url: this.dataset.url
                })
            } catch (e) {
                console.debug(e);
            }
        }
    }

    static get observedAttributes() {
        return ["data-title", "data-text", "data-url"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        const theButton = this.shadowRoot.getElementById("the-button");
        const theDetails = this.shadowRoot.getElementById("the-details");
        if (newValue) {
            switch (name) {
            case "data-title":
                theDetails.lastElementChild.textContent = newValue;
                break;
            case "data-text":
                theDetails.firstElementChild.textContent = newValue;
                break;
            case "data-url":
                theDetails.firstElementChild.href = newValue;
                break;
            }
            theButton.disabled = false;
        } else {
            switch(name) {
            case "data-title":
                theDetails.lastElementChild.textContent = "";
                break;
            case "data-text":
                theDetails.firstElementChild.textContent = this.dataset.url || "";
                break;
            case "data-url":
                theDetails.firstElementChild.removeAttribute("href");
            }

            if (!("title" in this.dataset || "text"in this.dataset || "url"in this.dataset)) {
                theButton.disabled = true;
            }
        }
    }
}
