import Utils from "./Utils.js";
import attachDbgUtils from "./attachDbgUtils.js";

(async () => {

    // click handler for sidepanel
    //chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });

    await Utils.domReady();

    // manual init function for scenarios where the bootstrap could not be detected.
    // will be deleted once the utils are available.
    globalThis._ui5dbg = {
        init: attachDbgUtils.bind(null, "manual")
    };

    if (Utils.ui5Available()) {
        attachDbgUtils("initial");
    } else {
        document.getElementById("sap-ui-bootstrap")?.addEventListener("load", () => {
            if (Utils.ui5Available()) {
                attachDbgUtils("lazy");
            }
        });
    }

})();
