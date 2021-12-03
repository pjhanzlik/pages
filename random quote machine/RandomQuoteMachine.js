const INITIAL_TEMPLATE = document.createElement("template");
INITIAL_TEMPLATE.innerHTML = `
<style>
:host,figure {
    display: grid;
}
:host {
    border-radius: 1em;
    --glyph-color: white;
    --space-color: black;
    padding: 1em;
    grid-template-areas: "output output" "share next";
    background-color: var(--space-color);
    color: var(--glyph-color);
    font-family: sans-serif;
    text-align: center;
    gap: 1em;
}
figure {
    gap: 0.3em;
    font-size: 1.25em;
}
:disabled {
    opacity: 0;
}
:any-link {
    text-decoration: unset;
}
button {
    background-color: unset;
    font-size: unset;
    text-align: unset;
    padding: unset;
    border: unset;
    font-family: unset;
}
button, :any-link {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--space-color);
    background-color: var(--glyph-color);
    border-radius: 4px;
    border: solid 4px var(--glyph-color);
}
output {
    grid-area: output; 
}
blockquote,figure {
    margin: 0;
}
#share {
    grid-area: share;
}
#next {
    grid-area: next;
}
blockquote {
    font-weight: bold;
    font-size: 1.25em;
}
</style>
<output for="next">
    <figure id="description">
        <blockquote id="quote"></blockquote>
        <figcaption id="caption"></figcaption>
    </figure>
</output>
<a id="share" part="button" rel="noopener" target="_blank" aria-describedby="description">Email</a>
<button id="next" part="button" type="button" disabled>New quote</button>`;

export default class extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});

        this.shadowRoot.append(INITIAL_TEMPLATE.content.cloneNode(true));
        this._caption = this.shadowRoot.getElementById("caption");
        this._share = this.shadowRoot.getElementById("share");
        this._quote = this.shadowRoot.getElementById("quote");
        this._next = this.shadowRoot.getElementById("next");
        this._next.onclick = () => {
            this.nextQuote();
            this.scrollIntoView(true);
        }
    }

    static get observedAttributes() { return ["data-quotes"] };

    attributeChangedCallback(name, oldValue, nextValue) {
        this.fetchQuotes(nextValue);
    }

    fetchQuotes = async (url) => {
        if(this._prevFetch) {
            this._prevFetch.abort();
        }
        this._prevFetch = new AbortController();
        const response = await fetch(url, {signal: this._prevFetch.signal});
        this.unread = await response.json();
        this.nextQuote();
    }

    nextQuote = () => {
        const next = Math.floor(Math.random()*this.unread.length);
        this._quote.textContent = this.unread[next].quote;
        this._caption.textContent = this.unread[next].caption;
        this._share.href = `mailto:?subject=${this.unread[next].quote}&body=${this.unread[next].caption}`;
        if(this.unread[next].source) {
            this._quote.cite = this.unread[next].source;
        }
        else {
            this._quote.removeAttribute("cite");
        }

        this.unread = this.unread.slice(0,next).concat(this.unread.slice(next+1));
    }

    set unread(array) {
        if(array.length) {
            this._next.disabled = false;
        }
        else {
            this._next.disabled = true;
        }
        this._unread = array;
    }

    get unread() {
        return this._unread;
    }
}