const TAG = navigator.share ? "button" : "a";
const ATTRIBUTES = navigator.share ? 'type="button" disabled' : 'rel="noopener" target="_blank"';
const TEXT = navigator.share ? "Share" : "Email";

const INIT_TEMPLATE = document.createElement("template");
INIT_TEMPLATE.innerHTML = `<${TAG} ${ATTRIBUTES}>${TEXT}</${TAG}>`

export default class extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.append(INIT_TEMPLATE.content.cloneNode(true));
        const shareButton = this.shadowRoot.getElementById("share-button");
        if (shareButton instanceof HTMLButtonElement) {
            shareButton.onclick = async ()=>{
                try {
                    await navigator.share(this.shareData)
                } catch (shareException) {
                    console.debug(shareException);
                }
            }
        }
    }
}