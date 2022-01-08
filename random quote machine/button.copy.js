if (navigator.clipboard) {
    const copyImport = await import("./copyLegend.js");
    const copyFields = document.querySelectorAll("fieldset .copy");
    copyFields.forEach(element => {
        element.onclick = copyImport.default;
        element.disabled = false;
    });   
}