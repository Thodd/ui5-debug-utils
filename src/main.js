// bootstrap extension as a module, so we can use ES6 import statements
const script = document.createElement('script');
script.type = "module";
script.src = chrome.runtime.getURL('src/bootstrap.js');
(document.head||document.documentElement).appendChild(script);
script.onload = function() {
    // clean up the script tag so we don't cause issues
    script.remove();
};