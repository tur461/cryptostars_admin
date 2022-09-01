import { ADDRESS } from "../constant";

const eHandle = e => e.preventDefault() || !0;

const isArr = a => a instanceof Array;
const isObj = o => typeof o === 'object';
const isStr = s => typeof s === 'string';
const isNum = s => typeof s === 'number';

function rEqual(a, b) {
    return isStr(a) && isStr(b) ? a.toLowerCase() === b.toLowerCase() :
    isNum(a) && isNum(b) ? a === b :
    (isStr(a) && isNum(b)) || (isStr(b) && isNum(a)) ? a == b : !1; 
}

const notEqual = (a ,b) => !rEqual(a, b);

function empty(v) {
    return isStr(v) || isArr(v) ? rEqual(v.length, 0) :
    isObj(v) ? rEqual(Object.entries(v).length, 0) : !1 ;
}

const notEmpty = v => !empty(v);

const contains = (s, q) => notEqual(s.toLowerCase().indexOf(q), -1);

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

function isAddr(addr) {
    return addr && 
    isStr(addr) && 
    addr.length === 42 && 
    notEqual(addr, ADDRESS.ZERO);
}



export {
    empty,
    isAddr,
    rEqual,
    contains,
    eHandle,
    notEqual,
    notEmpty,
    selectText,
}