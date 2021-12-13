const TITLE = "Hello, World!";
const URL = "https://en.wikipedia.org/wiki/%22Hello,_World!%22_program";
const TEXT = "A great default greeting for the day.";
const SHARE_TAG = navigator.share ? "button" : "a";
const SHARE_ATTRIBUTES = navigator.share ? 'type="button"' : `rel="noopener" target="_blank" href="mailto:?subject=${TITLE}&body=${TEXT}%0A${URL}"`;
const SHARE_TEXT = navigator.share ? "Share" : "E-mail";

const INIT_TEMPLATE = document.createElement("template");
INIT_TEMPLATE.innerHTML = `<style>
:host {
    display: block;
    background-color: var(--space-color);
    color: var(--glyph-color);
    border-radius: 16px;
    padding: 16px;
    --glyph-color: white;
    --space-color: black;
    font-family: cursive;
    text-align: start;
}
::slotted(figure),figure {
    margin: 0;
}
:host > fieldset {
    border: none;
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
    padding: 0;
    perspective: 1em;

}
:host > fieldset > legend {
    float: left;
    flex: 100%;
}
#share-button, #next-button {
    flex: auto;
    appearance: none;
    padding: 4px;
    border: none;
    border-radius: 4px;
    background-color: var(--glyph-color);
    color: var(--space-color);
    font-family: unset;
    transition: transform 0.1s;
    text-decoration: none;
}
#rest-slot {
    display: none;
}
:disabled {
    opacity: 0;
}
:is(#share-button, #next-button):active:hover {
    transform: translateZ(-1px);
}
</style>
<fieldset>
    <legend>
        <slot id="head-slot" name="head">
            <figure>
                <blockquote cite="${URL}">${TITLE}</blockquote>
                <figcaption>${TEXT}</figcaption>
            </figure>
        </slot>
    </legend>
    <${SHARE_TAG} ${SHARE_ATTRIBUTES} part="button" id="share-button">${SHARE_TEXT}</${SHARE_TAG}>
    <button part="button" id="next-button" type="button" disabled>Next</button>
    <slot id="rest-slot">
    </slot>
</fieldset>`;

export default class extends HTMLElement {
    get shareData() {
        const sharedSlot = this.shadowRoot.getElementById("head-slot");
        const shareQuote = sharedSlot.assignedElements()[0] || sharedSlot.firstElementChild;
        const caption = shareQuote.querySelector("figcaption,summary");
        const quote = shareQuote.querySelector("q,blockquote");

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
            shareButton.onclick = async ()=>{
                try {
                    await navigator.share(this.shareData)
                } catch (shareException) {
                    console.debug(shareException);
                }
            }
        }

        const nextButton = this.shadowRoot.getElementById("next-button");
        const headSlot = this.shadowRoot.getElementById("head-slot");
        const restSlot = this.shadowRoot.getElementById("rest-slot");
        nextButton.onclick = async ()=>{
            const restQuotes = restSlot.assignedElements();
            const headQuotes = headSlot.assignedElements();
            if(headQuotes.length === 1) {
                headSlot.assignedElements()[0].removeAttribute("slot");
            }
            else if(headQuotes.length > 1) {
                throw new Error("Only one quote should be slotted when next is pressed")
            }

            if(restQuotes.length) {
                restQuotes[Math.floor(Math.random()*restQuotes.length)].slot = "head"
            }

            this.scrollIntoView();
        };

        // Slot a random child if nothing is slotted, but a child is slottable
        const unslottedQuotes = restSlot.assignedElements();
        if(unslottedQuotes.length && !headSlot.assignedElements().length) {
            unslottedQuotes[Math.floor(Math.random()*unslottedQuotes.length)].slot = "head";
        }

        // Make sure only one element is slotted in head and ui is updated
        headSlot.addEventListener("slotchange", async ()=>{
            const quotes = headSlot.assignedElements();
            // Remove all but one quote from slot (would trigger slotchange)
            if (quotes.length > 1) {
                const extraQuotes = quotes.slice(quotes.length - 1)
                extraQuotes.map(async (q)=>{
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
