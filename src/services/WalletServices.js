import { 
    EVENTS,
    NETWORK_LINK, 
    NETWORK_RPC_URL, 
    NETWORK_CHAIN_ID, 
    NETWORK_CHAIN_NAME, 
    WALLET_METH, WALLET_TYPE,
    NETWORK_NATIVE_CURRENCY_NAME, 
    NETWORK_NATIVE_CURRENCY_SYMBOL, 
    NETWORK_NATIVE_CURRENCY_DECIMALS,
    STR_CONSTANT, 
} from "../constant";
import { toHex } from "web3-utils";
import { clearEnv, notEqual, rEqual } from "./utils";
import { ContractServices } from "./ContractServices";
import { toast } from "../Components/Toast/Toast";


const requestChainChange = async _ => {
    const {ethereum} = window;
    try {
        await ethereum.request({
            method: WALLET_METH.SWITCH_CHAIN,
            params: [{ chainId: toHex(NETWORK_CHAIN_ID) }],
        });
        } catch (err) {
            console.log('error requesting:', err)
            if (rEqual(err?.code, 4902)) {
                try {
                    await ethereum.request({
                        method: WALLET_METH.ADD_CHAIN,
                        params: [
                        {
                            chainId: toHex(NETWORK_CHAIN_ID),
                            chainName: NETWORK_CHAIN_NAME,
                            nativeCurrency: {
                            name: NETWORK_NATIVE_CURRENCY_NAME,
                            symbol: NETWORK_NATIVE_CURRENCY_SYMBOL,
                            decimals: Number(NETWORK_NATIVE_CURRENCY_DECIMALS),
                            },
                            rpcUrls: [NETWORK_RPC_URL],
                            blockExplorerUrls: [NETWORK_LINK],
                        },
                        ],
                    });
                    window.location.reload();
                } catch (err) {
                    throw err;
                }
            } else throw err;
        }
    
}


const setupWalletEventListeners = async walletType => {
    const { ethereum } = window;
    walletType = walletType || ContractServices.walletTypeObject;
    console.log('[setupWalletEventListeners]:', walletType);
    if (rEqual(walletType, WALLET_TYPE.METAMASK)) {
        console.log('listening for ethereum events')
        if (Boolean(ethereum && ethereum.isMetaMask)) {
        if (rEqual(toHex(ethereum.chainId), toHex(NETWORK_CHAIN_ID))) {
            try {
                await requestChainChange();
            } catch(e){ clearEnv() }
        }

        ethereum.on(EVENTS.ACC_CHANGED, async accounts => {
            console.log('account changed:', accounts);
            if (await ContractServices.isAdminAccount(accounts[0])) {
                window.location.reload();
            }
            else {
                clearEnv();
                toast.error(STR_CONSTANT.NOT_AN_ADMIN)
            }
        });

        ethereum.on(EVENTS.CHAIN_CHANGED, async chainId => {
            console.log('chain changed event. chainId:', chainId);
            if (notEqual(toHex(chainId), toHex(NETWORK_CHAIN_ID))) {
                try {
                    await requestChainChange();
                } catch(e){ clearEnv() }
            }
        });
        }
        console.log('listening for ethereum events done.')
    }

};

export const WalletService = {
    requestChainChange,
    setupWalletEventListeners,
}