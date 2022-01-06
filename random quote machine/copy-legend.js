if (navigator.clipboard) {

    const copyButtonTemplate = document.createElement("template");
    copyButtonTemplate.innerHTML = `<button type="button">Copy</button>`;

    customElements.define("copy-legend", class extends HTMLElement {
        constructor() {
            super();
            this.replaceChildren(this.constructor.replaceTemplate.content.cloneNode(true));
            this.onclick = this.constructor.onClick;
        }

        static onClick = async(event)=>{
            const closestFieldset = event.target.closest("fieldset");
            const legendContent = closestFieldset.firstElementChild.childElementCount === 1 ? closestFieldset.firstElementChild.firstElementChild : closestFieldset.firstElementChild;
            const data = [legendContent.title, legendContent.textContent]
            const url = legendContent.cite || legendContent.href || legendContent.src || (legendContent.id ? `#${legendContent.id}` : undefined);
            if (url) {
                // test for an absolute url
                if (url.match(/^[a-z]+:\/\//i)) {
                    data.push(url)
                } else {
                    data.push(new URL(url,document.location));
                }
            }
            navigator.clipboard.writeText(data.join(" "));
        }
        ;

        static replaceTemplate = copyButtonTemplate;
    }
    );
}
