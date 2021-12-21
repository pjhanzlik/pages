// Query Select quote and caption, make an appropriate mailto or share button
// Nope, can't query select because I need ids for aria-details
// SOOOOOOOOO, we need to use attributes

const TAG = navigator.share ? `button` : `a`;
const ATTRIBUTES = navigator.share ? `type="button" disabled` : `rel="noopener" target="_blank"`;
const TEXT = navigator.share ? `Share` : `E-mail`;

const INIT_TEMPLATE = document.createElement("template");
INIT_TEMPLATE.innerHTML = `<style></style>
<${TAG} id="share-button" ${ATTRIBUTES}>${TEXT}</${TAG}>`;

export default class extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: "open"
        });
        this.shadowRoot.append(INIT_TEMPLATE.content.cloneNode(true));
    }

    static get observedAttributes() {
        return ["data-list"];
    }

    attributeChangedCallback(_, oldValue, newValue) {
        if(oldValue) {
            this.observer.disconnect();
        }

        const shareButton = this.shadowRoot.getElementById("share-button")
        if(newValue) {
            const root = document.getElementById(newValue);
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if(entry.isIntersecting) {
                        shareButton.setAttribute("aria-details", entry)
                    }
                })
            }, {
                threshhold: 1.0,
                root
            });

            Array.from(root.children).map((ele) => {
                this.observer.observe(ele);
            });

        }
    }
}
