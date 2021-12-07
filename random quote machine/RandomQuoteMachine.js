const INIT_DATA = {
    title: "Hello, World!",
    url: "https://en.wikipedia.org/wiki/%22Hello,_World!%22_program",
    text: "A great default greeting for the day."
}

const INIT_TEMPLATE = document.createElement("template");
INIT_TEMPLATE.innerHTML = `<output for="next">
    <slot id="quote-slot" name="quote">
        <details>
            <summary><q cite="${INIT_DATA.url}">${INIT_DATA.title}</q></summary>
            ${INIT_DATA.text}
        </details>
    </slot>
</output>
${navigator.share ? `<button id="share-button" type="button" aria-describedby="quote">Share</button>` : `<a id="share-button" rel="noopener" target="_blank" aria-describedby="quote" href="mailto:?subject=${INIT_DATA.title}&body=${INIT_DATA.text}%0A${INIT_DATA.url}">Email</a>`}
<button id="next-button" type="button" disabled>Next</button>`;

export default class extends HTMLElement {
    get shareData() {
        const quoteSlot = this.shadowRoot.getElementById("quote-slot");
        const assignedQuotes = quoteSlot.assignedElements();

        const quoteElement = assignedQuotes.length ? assignedQuotes[0] : quoteSlot.firstElementChild;
        const titleElement = quoteElement.querySelector("summary,figcaption:first-child");

        return {
            title: titleElement.textContent.trim(),
            text: titleElement.nextSibling.textContent.trim(),
            url: titleElement.querySelector("q,blockquote").cite
        }
    }

    get mailto() {
        const {title, text, url} = this.shareData;
        return `mailto:?subject=${title}&body=${text}%0A${url}`
    }

    constructor() {
        super();
        this.attachShadow({
            mode: "open"
        });
        this.shadowRoot.append(INIT_TEMPLATE.content.cloneNode(true));

        const shareButton = this.shadowRoot.getElementById("share-button");
        if (shareButton instanceof HTMLButtonElement) {
            shareButton.onclick = async(clickedShare)=>{
                try {
                    await navigator.share(this.shareData)
                } catch (shareException) {
                    console.debug(shareException);
                }
            }
        }

        const nextButton = this.shadowRoot.getElementById("next-button");
        nextButton.onclick = (clickedNext)=>{
            const headIndex = Math.floor(Math.random() * (this.children.length - 1));
            if (this.children[headIndex].slot) {
                this.children[headIndex].removeAttribute("slot");
                this.lastElementChild.slot = "quote";
            } else {
                const quoteSlot = this.shadowRoot.getElementById("quote-slot");
                quoteSlot.assignedElements()[0].removeAttribute("slot");
                this.children[headIndex].slot = "quote";
            }
        }
        ;

        const quoteSlot = this.shadowRoot.getElementById("quote-slot");
        quoteSlot.addEventListener("slotchange", ()=>{
            const quotes = quoteSlot.assignedElements();
            // Remove all but one quote from slot (can trigger slotchange)
            if (quotes.length > 1) {
                const extraQuotes = quotes.slice(quotes.length - 1)
                extraQuotes.map((q)=>{
                    q.removeAttribute("slot")
                }
                );
            }// Having one quote slotted means we can safely set UI
            else {
                if (shareButton instanceof HTMLAnchorElement) {
                    shareButton.href = this.mailto;
                }

                if (this.children.length > 1) {
                    nextButton.disabled = false;
                } else {
                    nextButton.disabled = true;
                }
            }
        }
        );

    }
}
