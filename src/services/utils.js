const toB64 = s => btoa(s);

const eHandle = e => e.preventDefault() || !0;

const range = n => '0'.repeat(n).split('').map((_, i) => i + 1);

const truncAddr = addr => `${addr.slice(0, 5)}...${addr.slice(38, 42)}`;

const sortArr = arr => {
    if(arr[0]) {
        if(typeof arr[0] === 'string') {
            return arr.sort((a, b) => {
                a = a.toLowerCase();
                b = b.toLowerCase();
                return a < b ? 1 : a > b ? -1 : 0;
            })
        } else return arr;
    }
}

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

const toHex = n => `${n}`.indexOf('0x') > -1 ? n : `0x${Number(n).toString(16)}`;

export {
    toHex,
    toB64,
    range,
    sortArr,
    eHandle,
    truncAddr,
    LocalStore,
    selectText,
}