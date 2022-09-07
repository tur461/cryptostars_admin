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

export const TokenList = ({ data }) => {
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

  console.log(newTokenListBackend, ">>>>>NEWTOKENLISTBACKEND");

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
              <span>
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
              </span>
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
          </div>
        ))}
      </ul>
    </div>
  );
};
