import { VAL_CONSTANT } from "../constant";
import { API_PATH, BACK_END_URL } from "./constants"
import { jString } from "./utils";

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
    .catch(err => {
        console.log("saveTokenInfoToDB Error:", err)
    })
}

function saveTokenIconToDB(file, iconName, callback) {
    console.log("HIT SAVE TOKEN ICON");
    const imgData = new FormData();
    console.log('fff', file);
    imgData.append('token_icon', file)

    fetch(BACK_END_URL + '/api/save/tokenIcon', {
        method: 'POST',
        // headers: {'Content-Type': 'multipart/form-data'},
        body: imgData,
    })
    .then(r => r.json())
    .then(r => callback(null, r))
    .catch(er => callback(er, null));
}

async function retreiveTokenList(callback) {
    try {
        let getResult = await fetch(BACK_END_URL + "/api/get/tokenInfoList", {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            },      
        })
        getResult = await getResult.json();
        const infoList = JSON.parse(getResult.data);
        return infoList;
    } catch (error) {
        console.log('retreiveTokenList Error:', error);
    }
       
        // .then(d => d.json())
        // .then(res => {
        //         const infoList = JSON.parse(res.data);
        //         console.log('vvvvvvvinfoList',infoList);
        //         return infoList;
        //         // callback(infoList)
        //     })
            // .catch(err => {
            //         console.log('retreiveTokenList Error:', err);
            //     })
                // console.log(infoList,"getResult0")
}

function savePoolInfoToDB(poolInfo, callback) {
        console.log(BACK_END_URL,API_PATH.SAVE_POOL_INFO);
        console.log("tokenInfo-------",poolInfo);
        
        fetch(`${BACK_END_URL}${API_PATH.SAVE_POOL_INFO}`, {
            method: 'POST',
            body: JSON.stringify(poolInfo),
            headers: {
                'content-type': 'application/json'
            },
        })
        .then(d => {
            console.log('sucess saving token info');
            callback(d);
        })
        .catch(err => {
            console.log("savePoolInfoToDB Error:", err)
        })
}

function retreivePoolInfoList(callback) {
    fetch(BACK_END_URL + "/api/get/poolInfoList", {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        },      
    })
    .then(d => d.json())
    .then(res => {
        const poolInfoList = JSON.parse(res.data);
        console.log('vvvvvvvpoolInfoList',poolInfoList);
        callback(poolInfoList)
    })
    .catch(err => {
        console.log('retreivePoolInfoList Error', err);
    })
}

function retrieveProjectVersion() {
    return new Promise((r, j) => {
        fetch(API_PATH.PROJECT_VERSION, {
            method: 'POST',
            body: jString({
                projectId: VAL_CONSTANT.PROJECT_ID,
            }),
            headers: {
                'content-type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(res => r(res.data))
        .catch(er => j(er));
    });
}

export {
    savePoolInfoToDB,
    retreiveTokenList,
    saveTokenInfoToDB,
    saveTokenIconToDB,
    retreivePoolInfoList,
    retrieveProjectVersion,
}