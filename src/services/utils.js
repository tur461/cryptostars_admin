function selectText(node) {
    if (document.body.createTextRange) {
        const range = document.body.createTextRange();
        range.moveToElementText(node);
        range.select();
    } else if (window.getSelection) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(node);
        selection.removeAllRanges();
        selection.addRange(range);
    } else {
        console.warn("Could not select text in node: Unsupported browser.");
    }
}

const LocalStore = {
    has: key => key in localStorage,
    get: key => localStorage.getItem(key),
    del: key => localStorage.removeItem(key),
    add: (key, value) => localStorage.setItem(key, value), 

}

export {
    LocalStore,
    selectText,
}