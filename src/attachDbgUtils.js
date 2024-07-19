import Utils from "./Utils.js";

const dbgInterface = {

    async require(modules) {
        modules = Array.isArray(modules) ? modules : [modules];
        return new Promise(function(resolve, reject) {
            sap.ui.require(modules, function() {
                resolve(Array.from(arguments));
            }, reject)
        });
    },

    control(domNode) {
        return Utils.module("sap/ui/core/Element")?.closestTo(domNode);
    },

    byId(s) {
        return Utils.module("sap/ui/core/Element")?.getElementById(s);
    },

    owner(ele) {
        if (ele instanceof HTMLElement) {
            ele = this.control(ele);
        }
        return Utils.module("sap/ui/core/Component")?.getOwnerComponentFor(ele);
    },

    probe(moduleName) {
        return Utils.module(moduleName);
    },

    get includeStylesheet() {
        return Utils.module("sap/ui/dom/includeStylesheet");
    },

    get Device() {
        return Utils.module("sap/ui/Device");
    },

    // Quick access to configs
    cfg: {
        get Localization(){
            return Utils.module("sap/base/i18n/Localization");
        },
        get Theming() {
            return Utils.module("sap/ui/core/Theming");
        },
        get Formatting() {
            return Utils.module("sap/base/i18n/Formatting");
        },
        get ControlBehavior() {
            return Utils.module("sap/ui/core/ControlBehavior");
        },
        get Security() {
            return Utils.module("sap/ui/Security");
        }
    },

    modules: {
        get Core() {
            return Utils.module("sap/ui/core/Core");
        },
        get Element() {
            return Utils.module("sap/ui/core/Element");
        },
        get ManagedObject() {
            return Utils.module("sap/ui/base/ManagedObject");
        },
        get Component() {
            return Utils.module("sap/ui/core/Component");
        },
        get XMLView() {
            return Utils.module("sap/ui/core/mvc/XMLView");
        },
        get XMLTemplateProcessor() {
            return Utils.module("sap/ui/core/XMLTemplateProcessor");
        }
    }
}

function attachDbgUtils(msg) {
    delete globalThis._ui5dbg;

    if (globalThis._ui5) {
        console.log(`[🛠️ UI5 Debug Utils] '_ui5' already exists, UI5 Debug Utils are exposed as '_ui5dbg' - ${msg}.`)
        globalThis._ui5dbg = dbgInterface;
    } else {
        console.log(`[🛠️ UI5 Debug Utils] UI5 Debug Utils are exposed as '_ui5' - ${msg}.`);
        globalThis._ui5 = dbgInterface;
    }
}

export default attachDbgUtils;