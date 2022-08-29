import React, { useEffect, useState } from "react";
import { InputGroup, Table } from "react-bootstrap";
import { ContractServices } from "../../services/ContractServices";
import { MAIN_CONTRACT_LIST } from "../../assets/tokens/index";
import { toast } from "../../Components/Toast/Toast";
import Pagination from "./Pagination";
import { CopyToClipboard } from "react-copy-to-clipboard";
import copyIcon from "../../assets/images/icon_copyAddress.png";
// import Skeleton from 'react-loading-skeleton'
// import 'react-loading-skeleton/dist/skeleton.css'
import SkeletonCard from "./SkeletonCard";
import Logo from "../../assets/images/token_icons/ADA.svg";

import "./Tokenlist.scss";
import {
  LocalStore,
  selectText,
  sortArr,
  toB64,
  truncAddr,
} from "../../services/utils";
import { LS_KEYS, PAGE_SIZE } from "../../services/constants";
import { retreiveTokenList } from "../../services/api";

export const TokenList = ({ data }) => {
  const [tokensPerPage] = useState(PAGE_SIZE);
  const [isLoading, setLoading] = useState(!0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalTokens, setTotalTokens] = useState(0);
  const [currentTokenList, setCurrentTokenList] = useState([]);
  const [newTokenListBackend, setNewTokenListBackend] = useState([]);

  const endInterval = (num) => (num ? num : currentPage) * PAGE_SIZE - 1;
  const startInterval = (num) => ((num ? num : currentPage) - 1) * PAGE_SIZE;

  const [interval, setInterval] = useState({
    start: startInterval(),
    end: endInterval(),
  });

  useEffect(() => {
    newTokenList();
  }, []);

  const getTokenInfo = async (addr) => {
    let contract = await ContractServices.callContract(
      addr,
      MAIN_CONTRACT_LIST.clonedToken.abi
    );

    const dec = await contract.methods.decimals().call();

    return {
      addr,
      name: await contract.methods.name().call(),
      sym: await contract.methods.symbol().call(),
      supply: (
        (await contract.methods.totalSupply().call()) / dec
      ).toLocaleString("fullwide", { useGrouping: false }),
    };
  };

  const getTokenListInfos = async (start, end) => {
    const tokenInfoList = [];
    const addresses = JSON.parse(LocalStore.get(LS_KEYS.TOKEN_ADDR_LIST));
    for (let i = start; i <= end && i < addresses.length; ++i)
      tokenInfoList.push(await getTokenInfo(addresses[i]));
    return tokenInfoList;
  };

  const getInterval = (num) => [startInterval(num), endInterval(num)];

  //Fetching list from backend
  const newTokenList = () => {
    const result = retreiveTokenList((infoList) => {
      console.log("Result>>>>", infoList);
      setNewTokenListBackend([...infoList]);
    });
  };

  console.log(newTokenListBackend, ">>>>>NEWTOKENLISTBACKEND");

  const tryGetTokenListInfosFromCache = (start, end) => {
    const data = JSON.parse(LocalStore.get(LS_KEYS.TOKEN_INFO_LIST) || "[]");
    if (!data.length) return data;
    return data.slice(start, end + 1);
  };

  // function to be called from UI
  const getDataForPageNumber = async (num) => {
    const idxInterval = getInterval(num);
    console.log("interval:", idxInterval);
    setInterval(idxInterval);
    return tryGetTokenListInfosFromCache(...idxInterval);
  };

  const fetchTokenListData = async () => {
    setLoading(!0);
    let contract = await ContractServices.callContract(
      MAIN_CONTRACT_LIST.tokenFactory.address,
      MAIN_CONTRACT_LIST.tokenFactory.abi
    );
    const tokenAddrList = [
      ...(await contract.methods.getAllTokenAddress().call()),
    ];
    console.log("tokenAddrList", tokenAddrList);
    const reversed = sortArr(tokenAddrList);
    console.log("tokenAddrList (reversed)", tokenAddrList);
    LocalStore.add(LS_KEYS.TOKEN_ADDR_LIST, JSON.stringify(tokenAddrList));
    const infoList = await Promise.all(
      reversed.map(async (addr) => await getTokenInfo(addr))
    );
    LocalStore.add(LS_KEYS.TOKEN_INFO_LIST, JSON.stringify(infoList));
    setTotalTokens(tokenAddrList.length);
    setCurrentTokenList(await getDataForPageNumber(1));
    setLoading(!1);
  };

  useEffect(() => {
    if (totalTokens === 0) fetchTokenListData();
  }, []);

  const handleCurrentPageChange = async (num) => {
    console.log("current page change event: " + num);
    setCurrentPage(num);
    setCurrentTokenList(await getDataForPageNumber(num));
  };

  return (
    <div className="token_list">
      <ul>
        {newTokenListBackend?.map((token) => (
          <div className="token_card">
            <div className="token_img">
              <img src={Logo} alt="icon" height='165' width='165'/>
            </div>

            <div className="add_sec">
              <span>
                <label for="html">Token Name:</label>
                <li style={{ color: "white" }}>{token.name}</li>
              </span>
              <span>
                <label for="html">Token Symbol:</label>
                <li style={{ color: "white" }}>{token.sym}</li>
              </span>
              <span>
                <label for="html">Token Address:</label>
                <div className="trunc_sec">
                  <li id={toB64(token.addr)} style={{ color: "white" }}>{truncAddr(token.addr)}</li>
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
                <label for="html">Token Supply:</label>
                <li style={{ color: "white" }}>{token.tokenSupply}</li>
              </span>
              <span>
                <label for="html">Token Decimal:</label>
                <li style={{ color: "white" }}>{token.dec}</li>
              </span>
            </div>
          </div>
        ))}
      </ul>

      {/* <Table striped bordered hover className="table--token-list">
          <thead>
            <tr>
              <th>Token Name</th>
              <th>Symbol</th>
              <th>Address</th>
              <th>Total Supply</th>
            </tr>
          </thead>
          <tbody>
          {newTokenListBackend?.map(token => (
              <tr key={toB64(token.addr)}>
                <td>{token.name}</td>
                <td>{token.sym}</td>
                <td>
                  <p>
                    <span id={toB64(token.addr)}>{truncAddr(token.addr)}</span>
                    <CopyToClipboard
                      text={token.addr}
                      onCopy={_ => {
                        selectText(document.querySelector(`#${toB64(token.addr)}`));
                        toast.success("Copied!");
                      }}
                    >
                      <img
                        className="copy-icon cursor--pointer"
                        src={copyIcon}
                        alt="copy"
                      />
                    </CopyToClipboard>
                  </p>
                </td>
                <td>{token.tokenSupply}</td>
              </tr>
          ))}
          </tbody>
        </Table> */}
    </div>
  );
};
