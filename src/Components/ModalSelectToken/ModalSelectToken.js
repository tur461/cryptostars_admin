import React, { useEffect, useState } from "react";
import "./ModalSelectTokenStyle.scss";
import { Link } from "react-router-dom";
import sortIcon from "../../assets/images/arrow_sorting@2x.png";
import Card from "../Card/Card";
import icon_information from "../../assets/images/icon_information.png";
import closeBtn from "../../assets/images/ionic-md-close.svg";
import icon_bnb from "../../assets/images/icon_bnb.svg";
import { useDispatch } from "react-redux";
import {
  tokenListAdd,
  tokenListDel,
  removeTokenList,
  tokenShowRemove,
} from "../../redux/actions";
import TokenBalance from "./TokenBalance";
import { TOKEN_LIST } from "../../assets/tokens/index";
import useCommonHook from "../../hooks/common";
import { eHandle, rEqual } from "../../services/utils";
const ModalSelectToken = ({
  closeModal,
  tokenList,
  handleOrder,
  selectCurrency,
  tokenType,
  searchToken,
  symbol,
  onRemoveToken,
}) => {
  const dispatch = useDispatch();
  const commonHook = useCommonHook();

  return (
    <>
      <div className="backdrop"></div>
      <Card className="selectCurrency_modal">
        <div className="col modal_headerStyle">
          <div className="row modal_headerStyle__rowA lessMargin_bottom close-col">
            <div className="  modal_headerStyle__rowA_colLeft">
              <h2>Select a token</h2>
              <img src={icon_information} alt="icon" />
            </div>
            <div className=" modal_headerStyle__rowA_colRight">
              <Link to="#" onClick={closeModal}>
                <img src={closeBtn} alt="icon" />
              </Link>
            </div>
          </div>
          <div className="row modal_headerStyle__rowB lessMargin_bottom">
            <div className="col modal_headerStyle__rowB_searchInput">
              <input
                type="text"
                placeholder="Search or paste address"
                onChange={(e) => searchToken(e.target.value)}
              />
            </div>
          </div>
          <div className="row modal_headerStyle__rowC lessMargin_bottom close-col">
            <div className=" modal_headerStyle__rowC_colLeft">
              <h2>Token name</h2>
            </div>
            <div className=" modal_headerStyle__rowC_colRight">
              <button>
                <img
                  height="40"
                  src={sortIcon}
                  onClick={() => handleOrder(tokenList.reverse())}
                  alt="icon"
                />
              </button>
            </div>
          </div>
        </div>
        <div className="col tokenList__column">
          <ul className="tokenList">
            {tokenList.map((token, i) => (
                <li key={i} id={token.symbol}>
                  {rEqual(symbol, token.symbol) ? (
                    <div className="dis">
                      <span>
                        <img src={token.icon} alt="icon" />
                        <span className="tokenName_textStyle">
                          {token.symbol}
                        </span>{" "}
                      </span>
                      
                    </div>
                  ) : (
                    <>
                      <Link to="#" onClick={() => selectCurrency(token, tokenType)}>
                        <img src={token.icon} alt="icon" />
                        <span className="tokenName_textStyle">{token.symbol}</span>
                      </Link>
                      {/* {console.log("t.isAdd",t.isAdd,"isAdded",isAdded)} */}
                      {
                      token.showAdd ? (
                        <span
                        className="tokenName_textStyle add_token"
                        onClick={e => eHandle(e) && dispatch(tokenShowRemove(token))}
                        >
                          Add
                        </span>
                        
                      ) : (
                        <span
                          className="tokenName_textStyle add_token"
                          onClick={e => {
                              eHandle(e);
                              commonHook.delTokenFromList(token)
                              onRemoveToken();
                            }
                          }
                          >
                          Remove
                        </span>
                      )}
                      <TokenBalance address={token.address} />
                    </>
                  )}
                </li>
              ))}
          </ul>
        </div>
      </Card>
    </>
  );
};

export default ModalSelectToken;
