import { useSelector } from "react-redux";
import { ContractServices } from "../services/ContractServices";
import { contains, isAddr, notEmpty, rEqual } from "../services/utils";
import default_icon from "../assets/images/token_icons/default.svg";
import { useDispatch } from "react-redux";
import { tokenListAdd, tokenListDel, updateTokenListTempo } from "../redux/actions";
import { useEffect, useRef } from "react";

const useCommonHook = _ => {
    const dispatch = useDispatch();
    const persist = useSelector((state) => state.persist);

    const lock = useRef(!0);
    useEffect(_ => {
        if(lock.current) {
            dispatch(updateTokenListTempo(persist.tokenList));
            lock.current = !1;
        }
    })

    async function searchTokenByNameOrAddress(query, priAccount) {
        console.log('search query:', query);
        let tokenList = persist.tokenList;
        if (isAddr(query)) {
            const list = tokenList.filter(t => rEqual(t.address, query));
            if(notEmpty(list)) return dispatch(updateTokenListTempo(list));

            const dec = await ContractServices.getDecimals(query);
            const name = await ContractServices.getTokenName(query);
            const sym  = await ContractServices.getTokenSymbol(query);
            const bal = await ContractServices.getTokenBalance(query, priAccount);
            dispatch(tokenListAdd({
                name,
                decimals: dec,
                symbol: sym,
                balance: bal,
                address: query,
                isAdded: !1,
                icon: default_icon,
            }))
        } else if(notEmpty(query)) {
            const list = tokenList.filter(t => contains(t.symbol, query));
            console.log('list:', list);
            if(notEmpty(list)) dispatch(updateTokenListTempo(list));
            else dispatch(updateTokenListTempo([]))
        } else dispatch(updateTokenListTempo(tokenList));
    };

    async function delTokenFromList(token) {
        const tokenList = persist.tokenList;
        const idx = tokenList.findIndex(t => rEqual(t.address, token.address));
        if(idx > -1) return dispatch(tokenListDel(idx))
        console.log('token not found!');
    }

    async function addTokenToList(token) {
        const tokenList = persist.tokenList;
        const idx = tokenList.findIndex(t => rEqual(t.address, token.address));
        if(rEqual(idx, -1)) return dispatch(tokenListAdd(token))
        console.log('token already added!');
    }
    
    return {
        addTokenToList,
        delTokenFromList,
        searchTokenByNameOrAddress,
    }
}

export default useCommonHook;