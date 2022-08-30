import { API_PATH, BACK_END_URL } from "./constants"

function saveTokenInfoToDB(tokenInfo, callback) {
    console.log(BACK_END_URL, API_PATH.SAVE_TOKEN_INFO);
    console.log("tokenInfo-------",tokenInfo);
    
    fetch(`${BACK_END_URL}${API_PATH.SAVE_TOKEN_INFO}`, {
        method: 'POST',
        // data: JSON.stringify(tokenInfo),
        body: JSON.stringify(tokenInfo),
        headers: {
            'content-type': 'application/json'
        },        
    })
    .then(d => {
        console.log('sucess saving token info');
        callback(d);
    })
    .catch(e => {
        console.log("errrrrrr",e)
    })
}

function saveTokenIconToDB(file, callback) {
    console.log("HIT SAVE TOKEN ICON");
    const imgData = new FormData();
    imgData.append('token_icon', file)
    fetch('/api/save/tokenIcon', {
        method: 'POST',
        body: imgData
    })
    .then(r => r.json())
    .then(r => callback(null, r))
    .catch(er => callback(er, null));
}

function retreiveTokenList(callback) {
        fetch("http://localhost:8448/api/get/tokenInfoList", {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            },      
        })
        .then(d => d.json())
        .then(res => {
            const infoList = JSON.parse(res.data);
            console.log('vvvvvvv',infoList);
            callback(infoList)
        })
        .catch(err => {
            console.log('eeeeeeeeeee', err);
        })
    }

export {
    saveTokenInfoToDB,
    retreiveTokenList,
    saveTokenIconToDB,
}