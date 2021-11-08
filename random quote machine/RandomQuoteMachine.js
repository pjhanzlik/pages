export default class extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.append(this.constructor.initialTemplate.content.cloneNode(true));
        this.aborter = new AbortController();
    }

    static observedAttributes {
        return ["data-quotes"];
    }

    attributeChangeCallback(name, oldValue, newValue) {
        // clear parallel work done by previous data-quotes change
        this.aborter.abort();
        async () => {
            this.response = await fetch(newValue, {signal: this.aborter.signal});
    //      this.quotes = await read response as json

            // TODO verify proper json structure?
            
            // enable or disable new quote button based on fetched json
            if(this.quotes.length <= 1) {
                this.shadowRoot.getElementById("new").disabled = true;
            }
            else {
                if(this.shadowRoot.getElementById("new").disabled) {
                    this.shadowRoot.getElementById("new").disabled = false;
                }
            }

            this.quoteIndex = undefined;

            if(this.quotes.length >= 1) {
                this.newQuote();
            }
        }
    }

    newQuote = () => {
        const newQuotes = this.quoteIndex ? 
            Array.join(this.quotes[0,this.quoteIndex],this.quotes[this.quoteIndex]) :
            this.quotes;
        const randomIndex = Math.floor(Math.random() * this.newQuotes.length);
        this.shadowRoot.getElementById("body").textContent = newQuotes[randomIndex].body;
        this.shadowRoot.getElementById("subject") = newQuotes[randomIndex].subject;
    }

    static {
        this.initialTemplate = document.createElement("template");
        this.initialTemplate.innerHTML = `<output for="new">
            <figure>
            <blockquote id="body"></blockquote>
            <figcaption id="subject"></figcaption>
            </figure>
        </output>
        <a id="email">Email</a>
        <button id="new" type="button" disabled>New quote</button>
        `
    }
}