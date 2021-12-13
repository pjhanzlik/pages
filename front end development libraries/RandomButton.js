const INIT_TEMPLATE = document.createElement("template");
INIT_TEMPLATE.innerHTML = `<label for="anchor-text">View</label>
<label for="page-number">#</label>
<input type="number" id="page-number" min="0" value="0">
<select id="anchor-text">
    <option>Cover</option>
</select>`;

export default class extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: "open"
        });
        this.shadowRoot.append(INIT_TEMPLATE.content.cloneNode(true));

        const anchorText = this.shadowRoot.getElementById("anchor-text");
        const pageNumber = this.shadowRoot.getElementById("page-number");

        const anchors = this.querySelectorAll("a");
        if(anchors.length) {
            pageNumber.max = anchors.length;
            
//                convert anchors to options 
        }
    }


}
