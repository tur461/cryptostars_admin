import React, { useEffect, useState } from "react";
import "./ModalSelectTokenStyle.scss";
import { ContractServices } from "../../services/ContractServices";
import { useSelector } from "react-redux";

const TokenBalance = ({ address }) => {
  const [balance, setBalance] = useState("");
  const isUserConnected = useSelector((state) => state.persist.isUserConnected);
  console.log("HEREEEEEEEaddress", address);
  useEffect(() => {
    init();
  }, [isUserConnected]);
  console.log("aja balamnce", balance);
  const init = async () => {
    try {
      let res = 0;
      if (address === "BNB") {
        res = await ContractServices.getBNBBalance(isUserConnected);
        setBalance(res);
      } else {
        res = await ContractServices.getTokenBalance(address, isUserConnected);
        // console.log("qq", res);
        setBalance(res);
      }
    } catch (error) {
      console.log(error);
    }
    // try {
    //   let res = 0;
    //   res = await ContractServices.getBNBBalance(isUserConnected);
    //   setBalance(res);
    // } catch (error) {
    //   console.log(error);
    // }
  };
  return <span className="tokenName_textStyle">{balance}</span>;
};

export default TokenBalance;
