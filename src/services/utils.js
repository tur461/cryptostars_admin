// const toB64 = s => btoa(s);

// const eHandle = e => e.preventDefault() || !0;


// const range = n => '0'.repeat(n).split('').map((_, i) => i + 1);

// const truncAddr = addr => `${addr.slice(0, 5)}...${addr.slice(38, 42)}`;

// const sortArr = arr => {
//     if(arr[0]) {
//         if(typeof arr[0] === 'string') {
//             return arr.sort((a, b) => {
//                 a = a.toLowerCase();
//                 b = b.toLowerCase();
//                 return a < b ? 1 : a > b ? -1 : 0;
//             })
//         } else return arr;
//     }
// }

// function selectText(node) {
//     if (document.body.createTextRange) {
//         const range = document.body.createTextRange();
//         range.moveToElementText(node);
//         range.select();
//     } else if (window.getSelection) {
//         const selection = window.getSelection();
//         const range = document.createRange();
//         range.selectNodeContents(node);
//         selection.removeAllRanges();
//         selection.addRange(range);
//     } else {
//         console.warn("Could not select text in node: Unsupported browser.");
//     }
// }


// const LocalStore = {
//     has: key => key in localStorage,
//     get: key => localStorage.getItem(key),
//     del: key => localStorage.removeItem(key),
//     add: (key, value) => localStorage.setItem(key, value), 

// }

// const toHex = n => `${n}`.indexOf('0x') > -1 ? n : `0x${Number(n).toString(16)}`;

// export {
//     toHex,
//     toB64,
//     range,
//     sortArr,
//     eHandle,
//     truncAddr,
//     LocalStore,
//     selectText,
// }


import { ADDRESS } from "../constant";

const toB64 = s => btoa(s);
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

const toHex = n => `${n}`.indexOf('0x') > -1 ? n : `0x${Number(n).toString(16)}`;

const truncAddr = addr => `${addr.slice(0, 5)}...${addr.slice(38, 42)}`;


export {
    empty,
    isAddr,
    rEqual,
    notEqual,
    toB64,
    truncAddr,
    toHex,
    contains,
    eHandle,
    notEmpty,
    selectText,
}