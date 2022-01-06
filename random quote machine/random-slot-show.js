// I do not endorse randomly rearranging DOM since it can have weird affects
// For instance, reloading rearranged CSS scroll snapped elements which are
// navigated by id reference (#id in the url) can fail to scrollTo target
// Page loading an id nav seems to work in Chromium though, so rearranging
// DOM through slots seems to be a successful experiment

// ::part(group):hover and some other statements might be cool style tools
// ::part(group):first-of-type and the like sadly do not work
const slideTemplate = document.createElement("template");
slideTemplate.innerHTML = `<slot part="group"></slot>`

const randomlyInitSlots = (unslottedElements)=>{
    const unslottedArray = Array.from(unslottedElements);
    while (unslottedArray.length) {
        const nextIndex = Math.floor(Math.random() * unslottedArray.length);
        const [nextElement] = unslottedArray.splice(nextIndex, 1);
        const nextSlot = slideTemplate.content.cloneNode(true);
        nextSlot.querySelector("slot").name = nextElement.slot;
        nextElement.parentElement.shadowRoot.append(nextSlot);
    }
}

customElements.define("random-slot-show", class extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: "open"
        });

        const unslottedKids = this.querySelectorAll(":scope>[slot]");
        randomlyInitSlots(Array.from(unslottedKids));
    }
}
)
