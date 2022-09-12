import React, { useEffect, useState } from "react";
import { toast } from "../../Components/Toast/Toast";
import { retreiveTokenList } from "../../services/api";
import { BACK_END_URL } from "../../services/constants";
import { CopyToClipboard } from "react-copy-to-clipboard";
import copyIcon from "../../assets/images/icon_copyAddress.png";

import {
  selectText,
  toB64,
  truncAddr,
} from "../../services/utils";
import "./Tokenlist.scss";
import BurnModal from "./BurnModal";
import { getTokenBalance, startLoading } from "../../redux/actions";
import { ContractServices } from "../../services/ContractServices";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export const TokenList = ({ data }) => {
  const dispatch = useDispatch();
  const priAccount = useSelector(s => s.persist.priAccount);
  const [showBurnModal, setShowBurnModal] = useState(!1);
  const [newTokenListBackend, setNewTokenListBackend] = useState([]);

  useEffect(() => {
    newTokenList();
  }, []);

  //Fetching list from backend
  const newTokenList = () => {
    const result = retreiveTokenList((infoList) => {
      console.log("Result>>>>", infoList);
      setNewTokenListBackend([...infoList]);
    });
  };

  const getBalanceOf = addr => {
    return ContractServices.getTokenBalance(addr, priAccount);
  }

  const performBurnOperation = async (val, addr) => {
    dispatch(startLoading(!0));
    try{
      await ContractServices.burnToken(val, addr, priAccount);
      dispatch(startLoading(!1));
      toast.error('burn successful');
    } catch(e) {
      toast.error('burn unsuccessful, pls try again!');
      dispatch(startLoading(!1));
    }
  }

  return (
    <div className="token_list">
      <ul>
        {newTokenListBackend?.map((token) => (
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
                <li style={{ color: "white" }}>{token.supply.slice(0,20)}</li>
              </span>
              <span>
                <label htmlFor="html">Token Decimal:</label>
                <li style={{ color: "white" }}>{token.dec}</li>
              </span>
            </div>
            <div>
              <button onClick={e => setShowBurnModal(!0)}>BURN</button>
              {
                showBurnModal ?
                <BurnModal 
                  balance={async _ => await getBalanceOf(token.addr)}
                  addr={token.addr}
                  doBurnCallback={(v, addr) => performBurnOperation(v, addr)}
                  closeModalCallback={_ => setShowBurnModal(!1)}
                /> : <></>
              }
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};
