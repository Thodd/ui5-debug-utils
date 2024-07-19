const UI5_CLASSES = {};

const Utils = {

    async domReady() {
        return new Promise(function(resolve) {
            if (document.readyState !== "loading") {
                resolve();
            } else {
                var fnDomReady = function(res) {
                    document.removeEventListener("DOMContentLoaded", fnDomReady);
                    resolve();
                };
                document.addEventListener("DOMContentLoaded", fnDomReady);
            }
        });
    },

    ui5Available() {
        return globalThis?.sap?.ui?.require;
    },

    probe(className) {
        return UI5_CLASSES[className] ??= sap.ui.require(className);
    }
}

export default Utils;
