if (navigator.canShare) {
    // Share title, text, and url properties of closest legend or its only element
    const shareImport = await import("./shareLegend.js");

    const shareFields = document.querySelectorAll("fieldset .share");
    shareFields.forEach(element=>{
        element.onclick = shareImport.default;
        element.disabled = false;
    }
    );
}
