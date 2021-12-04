const _INITIAL_TEMPLATE = document.createElement("template");
_INITIAL_TEMPLATE.innerHTML = `
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
<button id="share" part="button" rel="noopener" target="_blank" aria-describedby="description">Share quote</button>
<button id="next" part="button" type="button" disabled>New quote</button>`;

const COMMITS = [
    {
        "caption": "Turns out browsers have security features which prevent users from blindly navigating to third-party websites.",
        "quote": "iframes with external links need target blank"
    },
    {
        "caption": "Everyone seems to like cards with rounded corners, so in this update I rounded corners.",
        "quote": "Card style tweaks"
    },
    {
        "caption": "This moment I learned that \"rm\" is different from \"git rm\".",
        "quote": "woops, need to remove old gitlab dir"
    },
    {
        "caption": "While it is neat to use images on top of buttons, I found colored text to be pretty and informative.",
        "quote": "remove logo links, use excalidraw colors"
    },
    {
        "caption": "What I actually did in this commit was allow iframes to resize themselves below 240px, so it is a really bad commit message.",
        "quote": "scale homepage width to sub-200px"
    },
    {
        "caption": "I have no idea what the update was. I think it was just correcting spelling errors.",
        "quote": "Update 'README.md'"
    },
    {
        "caption": "This might have changes with Codeberg Pages V2, but apostrephes in filenames resulted in HTTP errors.",
        "quote": "Codeberg does not like apostrephes in filenames"
    },
    {
        "caption": "My first commit in my Codeberg pages repo, and I don't have any regrets so far.",
        "quote": "Prepare for codeburg migration"
    }
];

export default class extends HTMLElement {
    constructor(quotes = COMMITS) {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.append(_INITIAL_TEMPLATE.content.cloneNode(true));
        this.unread = quotes;
        this.nextQuote();

        const next = this.shadowRoot.getElementById("next");
        next.onclick = () => {
            this.nextQuote();
            this.scrollIntoView(true);
        }

        const share = this.shadowRoot.getElementById("share");
        share.onclick = () => {
//             share API or copy API stuff
        }
    }

    nextQuote = () => {
        const quote = this.shadowRoot.getElementById("quote");
        const caption = this.shadowRoot.getElementById("caption");
        const share = this.shadowRoot.getElementById("share");

        const next = Math.floor(Math.random()*this.unread.length);

        quote.textContent = this.unread[next].quote;
        caption.textContent = this.unread[next].caption;
        share.href = `mailto:?subject=${this.unread[next].quote}&body=${this.unread[next].caption}`;
        if(this.unread[next].source) {
            quote.cite = this.unread[next].source;
        }
        else {
            quote.removeAttribute("cite");
        }

        this.unread = this.unread.slice(0,next).concat(this.unread.slice(next+1));
    }

    set unread(array) {
        const next = this.shadowRoot.getElementById("next");

        if(array.length) {
            next.disabled = false;
        }
        else {
            next.disabled = true;
        }
        this._unread = array;
    }

    get unread() {
        return this._unread;
    }
}