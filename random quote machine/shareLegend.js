export default async(event)=>{
    const closestFieldset = event.target.closest("fieldset");
    const legendContent = closestFieldset.firstElementChild.childElementCount === 1 ? closestFieldset.firstElementChild.firstElementChild : closestFieldset.firstElementChild;
    try {
        await navigator.share({
            title: legendContent.title,
            text: legendContent.textContent,
            // If a url can be formed from phrasing content attributes, do so
            url: legendContent.cite || legendContent.href || legendContent.src || (legendContent.id ? `#${legendContent.id}` : undefined)
        })
    } catch (e) {
        if (e.message !== "Share canceled") {
            throw e;
        }
    }
}
