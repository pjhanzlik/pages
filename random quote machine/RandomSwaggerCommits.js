const INIT_TEMPLATE = document.createElement("template");
INIT_TEMPLATE.innerHTML = `<details id="commit">
    <summary>
        <output id="message" for="next">
            Hello, World!
        </output>
    </summary>
    <dl id="meta">
        <dt>SHA</dt>
        <dd id="sha">01ba4719c80b6fe911b091a7c05124b64eeece964e09c058ef8f9805daca546b</dd>
        <dt>Created</dt>
        <dd id="created">${new Date()}</dd>
    </dl>
    Looks like there are no commits to read.
</details>
${navigator.share ? `<button id="share" type="button" aria-describedby="commit">Share</button>` : `<a id="share" target="_blank" aria-describedby="commit">Email</a>`}
<button id="next" type="button" disabled>Next</button>`;

export default class extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.append(INIT_TEMPLATE.content.cloneNode(true));
        
        const commit = this.shadowRoot.getElementById("commit");
        const message = this.shadowRoot.getElementById("message");
        const next = this.shadowRoot.getElementById("next");
        const share = this.shadowRoot.getElementById("share");
        const meta = this.shadowRoot.getElementById("meta");

        next.onclick = () => {
            this.nextQuote();
            this.scrollIntoView(true);
        }

        if(share instanceof HTMLButtonElement) {
            share.onclick = async () => {
                try {
                    await navigator.share({
                        title: "Hello",
                        text: "World" 
                    })
                }
                catch(e) {
                    console.debug(e);
                }
            }
        }
        else {

        }
    }
}