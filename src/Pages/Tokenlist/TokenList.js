import React, { useEffect, useState } from "react";
import { toast } from "../../Components/Toast/Toast";
import { retreiveTokenList } from "../../services/api";
import { BACK_END_URL } from "../../services/constants";
import { CopyToClipboard } from "react-copy-to-clipboard";
import copyIcon from "../../assets/images/icon_copyAddress.png";

import {
  eHandle,
  isAddr,
  selectText,
  toB64,
  truncAddr,
} from "../../services/utils";
import "./Tokenlist.scss";
import BurnModal from "./BurnModal";
import { getTokenBalance, startLoading, stopLoading } from "../../redux/actions";
import { ContractServices } from "../../services/ContractServices";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Button from "../../Components/Button/Button";
import { ADDRESS } from "../../constant";

export const TokenList = ({ data }) => {
  const dispatch = useDispatch();
  const priAccount = useSelector(s => s.persist.priAccount);
  const [showBurnModal, setShowBurnModal] = useState(!1)
  const [tokenAddr, setTokenAddr] = useState(ADDRESS.ZERO);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [newTokenListBackend, setNewTokenListBackend] = useState([]);
  const [tokenBalanceList, setTokenBalanceList] = useState(0);
    
  useEffect(() => {
    newTokenList();
  }, []);

  //Fetching list from backend
  const newTokenList = async() => {
    const infoList = await retreiveTokenList();
    console.log(infoList,"tertsweeerre==");
    setNewTokenListBackend(infoList);
    
        for (let i = 0;i<infoList.length;i++){
      console.log(infoList[i],"infoList[i]");
      const newBAl = await getBalanceOfToken(infoList[i]);
      console.log(newBAl,"NowNEWBAL");
      infoList[i] = {...infoList[i],tBalance:newBAl};
      console.log(infoList.tBalance,"infoList")
    }
  
  };
//for burn
 
  const getBalanceOf = async addr => {
    console.log(newTokenListBackend,"newTokenListBackend==");
    const bal = await ContractServices.getTokenBalance(addr, priAccount);
    console.log(bal,"addr====");
    return bal;
  }
  //for token balance
    const getBalanceOfToken = async addr => {
    console.log(addr,"weweerewr[i]",priAccount);
    const bal = await ContractServices.getTokenBalance(addr, priAccount);
    console.log(bal,"addraddraddr");    
    return bal;
  }
    const performBurnOperation = async (val, addr) => {
    console.log('performing burn op:', val, addr);
    dispatch(startLoading());
    try{
      await ContractServices.burnToken(val, addr, priAccount);
      dispatch(stopLoading());
      toast.success('burn successful');
    } catch(e) {
      console.log('error', e);
      toast.error('burn unsuccessful, pls try again!');
      dispatch(stopLoading());
    }
  }
  useEffect(_ => {
    console.log('tokenAddr changed:', tokenAddr);
    if(isAddr(tokenAddr)) {
      setShowBurnModal(!0);
    }
     //total supply for list
    
  }, [tokenAddr])

  
 
 
  return (
    <div className="token_list">
      <ul>
        {newTokenListBackend.length>0 && newTokenListBackend?.map((token, i) => (
         
          <div className="token_card" key={token.name}>
            <div className="token_img">
              <img
                src={`${BACK_END_URL}/uploads/${token.icon}`}
                alt="icon"
                height="165"
                width="165"
              />
            </div>

            <div className="add_sec">
              <span>
                <label htmlFor="html">Token Name:</label>
                <li style={{ color: "white" }}>{token.name.slice(0,10)}...</li>
              </span>
              <span>
                <label htmlFor="html">Token Symbol:</label>
                <li style={{ color: "white" }}>{token.sym.slice(0,10)}...</li>
              </span>
              <div>
                <label htmlFor="html">Token Address:</label>
                <div className="trunc_sec">
                  <li id={toB64(token.addr)} style={{ color: "white" }}>
                    {truncAddr(token.addr)}
                  </li>
                  <CopyToClipboard
                    text={token.addr}
                    onCopy={(_) => {
                      selectText(
                        document.querySelector(`#${toB64(token.addr)}`)
                      );
                      toast.success("Copied!");
                    }}
                  >
                    <img
                      className="copy-icon cursor--pointer"
                      src={copyIcon}
                      alt="copy"
                    />
                  </CopyToClipboard>
                  
                </div>
                
              </div>
            </div>
            
            <div className="supply_sec">
              <span>
                <label htmlFor="html">Token Supply:</label>
                <li style={{ color: "white" }}>{token.tBalance}</li>
              </span>
              <span>
                <label htmlFor="html">Token Decimal:</label>
                <li style={{ color: "white" }}>{token.dec}</li>
              </span>
            </div>
            <div>
              <Button onClick={async e => {
                eHandle(e);
                const bal = await getBalanceOf(token.addr);
                setTokenBalance(bal);
                setTokenAddr(token.addr);
              }}>BURN</Button>
            </div>
            
          </div>
        ))}
      </ul>
      {
      showBurnModal &&
          <BurnModal
            balance={tokenBalance}
            addr={tokenAddr}
            doBurnCallback={(v, addr) => performBurnOperation(v, addr)}
            closeModalCallback={_ => setShowBurnModal(!1)}
          />
      }
    </div>
  );
};
