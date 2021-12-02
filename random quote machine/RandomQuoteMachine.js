const INITIAL_TEMPLATE = document.createElement("template");
INITIAL_TEMPLATE.innerHTML = `<output for="next">
    <figure id="description">
        <blockquote id="quote"></blockquote>
        <figcaption id="caption"></figcaption>
    </figure>
</output>
<a href="." id="email" aria-describedby="description">Email</a>
<button id="next" type="button" disabled>New quote</button>`;

export default class extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.append(INITIAL_TEMPLATE.content.cloneNode(true));
        this.next = this.shadowRoot.getElementById("next");
        this.next.onclick = this.newQuote;
    }

    static get observedAttributes() { return ["data-quotes"] };

    attributeChangedCallback(name, oldValue, newValue) {
        this.handleQuotesChange(newValue);
    }

    handleQuotesChange = async (url) => {
        const response = await fetch(url);
        this.quotes = await response.json();

        // enable or disable new quote button based on fetched json
        if(this.quotes.length <= 1) {
            this.shadowRoot.getElementById("new").disabled = true;
        }
        else {
            if(this.next.disabled) {
                this.next.disabled = false;
            }
        }

        this.quoteIndex = undefined;

        if(this.quotes.length >= 1) {
            this.newQuote();
        }
    }

    newQuote = () => {
        const newQuotes = this.quoteIndex ? 
            Array.join(this.quotes[0,this.quoteIndex],this.quotes[this.quoteIndex]) :
            this.quotes;
        const randomIndex = Math.floor(Math.random() * newQuotes.length);
        this.shadowRoot.getElementById("caption").textContent = newQuotes[randomIndex].caption;
        this.shadowRoot.getElementById("quote").textContent = newQuotes[randomIndex].quote;
    }
}