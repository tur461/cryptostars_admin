import { TOKEN_LIST } from "../../assets/tokens";
import { empty, rEqual } from "../../services/utils";
import { actionTypes } from "../actions/PersistActions";
console.log("tokeeeeee", TOKEN_LIST);
const initialState = {
  walletType: "Metamask",
  isUserConnected: "",
  tokenList: [],
  tokenListTempo: [],
  slippagePercentage: 1,
  deadline: 20,
  userInfo: "",
  loggedIn: false,
  userLpTokens: [],
  recentTransactions: [],
  referralAddress: "",
  updateUserLpTokens: false,
  anchorValue: "0.01",
};

const persist = (state = initialState, action) => {
  const token = action.payload;
      const tList = initialState.tokenList;
  switch (action.type) {
    case actionTypes.USER_CONNECTED:
      return {
        ...state,
        isUserConnected: action.payload.account,
        walletType: action.payload.walletType,
      };
      
    case actionTypes.TOKEN_LIST_ADD:
      const list = tList.filter(t=> rEqual(t.addr, token.addr));
      // check if already in the list
      if(empty(list)) {
        // token not in the list
        initialState.tokenList = [...state.tokenList, token]
        initialState.tokenListTempo = [...state.tokenList, token];
        return {
          ...state,
          tokenList: initialState.tokenList,
          tokenListTempo: initialState.tokenListTempo,
        }
      }

      return state;

    case actionTypes.TOKEN_LIST_DEL:
      
      const idx = tList.findIndex(t => rEqual(t.addr, token.addr));
      console.log('removing item at:', idx, '\ntoken to be removed:', token);  
      
      if(idx > -1) {
        initialState.tokenList.splice(idx, 1);
        initialState.tokenListTempo.splice(idx, 1);
      } 
      return {
        ...state,
        tokenList: initialState.tokenList,
        tokenListTempo: initialState.tokenListTempo,
      };
    case actionTypes.SAVE_SLIPPAGE_PERCENTAGE:
      return {
        ...state,
        slippagePercentage: action.payload,
      };
    case actionTypes.SAVE_DEADLINE:
      return {
        ...state,
        deadline: action.payload,
      };
    case actionTypes.LOGIN_USER_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
        loggedIn: true,
      };
    case actionTypes.SAVE_USER_LP_TOKENS:
      return {
        ...state,
        userLpTokens: action.payload,
      };
    case actionTypes.SAVE_USER_RECENT_TRANSACTIONS:
      return {
        ...state,
        recentTransactions: action.payload.recentTransactions,
      };
    case actionTypes.LOGOUT:
      return initialState;
    case actionTypes.SAVE_REFFRAL_ADDRESS:
      return {
        ...state,
        referralAddress: action.payload,
      };
    case actionTypes.CHECK_USER_LPTOKENS:
      return {
        ...state,
        updateUserLpTokens: action.payload,
      };
    case actionTypes.SAVE_DOLLAR_VALUE:
      return {
        ...state,
        anchorValue: action.payload,
      };
    default:
      return state;
  }
};

export default persist;
