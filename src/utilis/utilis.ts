import { toast } from "react-hot-toast";

/** Delay timer */
function timer(delay: number = 1000) {
    return new Promise(function (resolve) {
        setTimeout(resolve, delay);
    });
}

function toCopyBoard(str: string) {
    const textarea = document.createElement("textarea");
    textarea.textContent = str;
    textarea.style.position = "fixed";
    document.body.appendChild(textarea);

    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);

    toast.success("Copied to clipboard");
}

function getTabsInfo(tabs: chrome.tabs.Tab[]) {
    const tab = tabs[0];
    if (tab.url) {
        const urlParams = new URL(tab.url);
        const domain = urlParams.hostname

        return {
            tabID: tab.id,
            domain: domain,
        };
    }

    return {
        tabID: tab.id,
        domain: ""
    };
}


export {
    getTabsInfo,
    toCopyBoard,
    timer
};
