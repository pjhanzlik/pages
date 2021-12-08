const EXAMPLE_DATA = {
    title: "Hello, World!",
    url: "https://en.wikipedia.org/wiki/%22Hello,_World!%22_program",
    text: "A great default greeting for the day."
}

const INIT_TEMPLATE = document.createElement("template");
INIT_TEMPLATE.innerHTML = `<fieldset>
    <legend>
        <slot id="quote-slot" name="quote">
            <figure>
                <blockquote cite="${EXAMPLE_DATA.url}">${EXAMPLE_DATA.title}</blockquote>
                <figcaption>${EXAMPLE_DATA.text}</figcaption>
            </figure>
        </slot>
    </legend>
    ${navigator.share ? `<button type="button"` : `<a rel="noopener" target="_blank" href="mailto:?subject=${EXAMPLE_DATA.title}&body=${EXAMPLE_DATA.text}%0A${EXAMPLE_DATA.url}"`} id="share-button">${navigator.share ? `Share</button>` : `Email</a>`}
    <button id="next-button" type="button" disabled>Next</button>
</fieldset>`;

export default class extends HTMLElement {
    get shareData() {
        const quoteSlot = this.shadowRoot.getElementById("quote-slot");
        const assignedQuotes = quoteSlot.assignedElements();
        const currentQuote = assignedQuotes.length ? assignedQuotes[0] : quoteSlot.firstElementChild;
        const caption = currentQuote.querySelector("figcaption,summary");
        const quote = currentQuote.querySelector("q,blockquote");

        return {
            title: caption.textContent.trim(),
            text: quote.textContent.trim(),
            url: quote.cite
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
        };

        const quoteSlot = this.shadowRoot.getElementById("quote-slot");
        if(!quoteSlot.assignedElements.length) {
            this.children[Math.floor(Math.random()*this.children.length)].slot = "quote";
        }
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
