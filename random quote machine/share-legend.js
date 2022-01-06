if (navigator.canShare) {
    // Replace Light DOM children of component with a safely generic Share button
    const replaceChildrenTemplate = document.createElement("template");
    replaceChildrenTemplate.innerHTML = `<button type="button">Share</button>`;

    // Share title, text, and url properties of closest legend or its only element
    const onClick = async(event)=>{
        const closestFieldset = event.target.closest("fieldset");
        const legendContent = closestFieldset.firstElementChild.childElementCount === 1 ? closestFieldset.firstElementChild.firstElementChild : closestFieldset.firstElementChild;
        try {
            await navigator.share({
                title: legendContent.title,
                text: legendContent.textContent,
                // If a url can be formed from phrasing content attributes, do so
                url: legendContent.cite || legendContent.href || legendContent.src || (legendContent.id ? `#${legendContent.id}` : undefined)
            })
            // TODO HAndle only canceld share
        } catch (e) {
            console.debug(e);
        }
    }

    customElements.define("share-legend", class extends HTMLElement {
        constructor() {
            super();
            this.replaceChildren(replaceChildrenTemplate.content.cloneNode(true));
            this.onclick = onClick;
        }
    }
    );
}
