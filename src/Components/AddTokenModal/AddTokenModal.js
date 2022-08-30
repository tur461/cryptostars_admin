import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AddTokenModal.scss";
import "../../App.scss";
import "../../Pages/Public/Swap/Swap.scss";
import back from "../../assets/images/back-arrow.svg";
import { Modal, FormLabel, Button, Toast } from "react-bootstrap";
import PreviewAddTokenModal from "./PreviewAddTokenModal";
import Web3 from "web3";
import { useSelector } from "react-redux";
import ProfileModal from "../ProfileModal/ProfileModal";
import { logout } from "../../redux/actions";


function AddTokenModal() {


  let refrenceVariable = false;
  const [show, setShow] = useState(false);
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [totalSupply, setTotalSupply] = useState("");
  const [mintAddress, setMintAddress] = useState("");
  const [ownerAddress, setOwnerAddress] = useState("");
  // const [errorCount, setErrorCount] = useState("0");
  const [isOpen, setModal] = useState(false);
  const [walletShow, setWalletShow] = useState(false);


  const [nameError, setnameError] = useState("");
  const [symbolError, setSymbolError] = useState("");
  const [supplyError, setSupplyError] = useState("");
  const [mintAddressError, setMintAddressError] = useState("");
  const [ownerAddressError, setOwnerAddressError] = useState("");
  const [error, setError] = useState(false);
  const [symbolsArr] = useState(["e", "E", "+", "-"]);

  
  const handleChange = (e, fieldName) => {
    switch ((e, fieldName)) {
      case "tokenName":
        const { value } = e.target;
        console.log("Input value: ", value);
        const re = /^[a-z 0-9]+( [a-z 0-9]+)*$/gi;

        if (value === "" || re.test(value)) {
          setTokenName(value);
        }
        value == ""
          ? setnameError("Please Enter Token Name")
          : setnameError("");
        setError(false);

        // setTokenName(e.target.value);

        break;
      case "tokenSymbol":
        console.log("mmmmmmmmmmmmmrrrrrrrrrr", e.target.value);
        const value1 = e.target.value;
        console.log("Input value1111111111: ", value1);
        const re1 = /^[A-Za-z]+$/;
        if (value1 === "" || re1.test(value1)) {
          setTokenSymbol(value1);
        }
        value1 == ""
          ? setSymbolError("Please Enter Token Name")
          : setSymbolError("");
        setError(false);
        break;
      case "totalSupply":
        e.target.value == ""
          ? setSupplyError("Please Enter Token Supply")
          : setSupplyError("");
        setError(false);
        setTotalSupply(e.target.value.toString());

        break;
      case "mintAddress":
        e.target.value == ""
          ? setMintAddressError("Please Enter Mint Address")
          : setMintAddressError("");
        setError(false);
        try {
          const isValidAddress = Web3.utils.toChecksumAddress(e.target.value);
          if (isValidAddress || e.target.value) {
            setMintAddress(e.target.value);
            setMintAddressError("");
            setError(false);
          }
        } catch (err) {
          setError(true);
          console.error("invalid ethereum address", err.message);
          setMintAddress(e.target.value);
          setMintAddressError("Please  Enter correct Mint Address");
        }
        refrenceVariable = true;

        break;
      case "ownerAddress":
        e.target.value == ""
          ? setOwnerAddressError("Please Enter Mint Address")
          : setOwnerAddressError("");
        setError(false);
        try {
          const isValidAddress = Web3.utils.toChecksumAddress(e.target.value);
          if (isValidAddress || e.target.value) {
            setOwnerAddress(e.target.value);
            setOwnerAddressError("");
            setError(false);
          }
        } catch (err) {
          setError(true);
          console.error("invalid ethereum address", err.message);
          setOwnerAddress(e.target.value);
          setOwnerAddressError("Please  Enter correct Mint Address");
        }

        // e.target.value==''?setOwnerAddressError("Please Enter Owner Address"):setOwnerAddressError('')
        // setOwnerAddress(e.target.value);
        refrenceVariable = true;
        break;
      default:
        console.log("default case");
    }
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log("token ka naam", tokenName);

  const Preview = () => {
    if (tokenName == "") {
      setnameError("Please Enter Token Name");
      setError(true);
    }
    if (tokenSymbol == "") {
      setSymbolError("Please Enter Token Symbol");
      setError(true);
    }
    if (totalSupply == "") {
      setSupplyError("Please Enter Token TotalSupply");
      setError(true);
    }
    if (mintAddress == "") {
      setMintAddressError("Please Enter Mint Address");
      setError(true);
    }
    if (ownerAddress == "") {
      setOwnerAddressError("Please Enter Owner Address");
      setError(true);
    }
    console.log("rrrrrrrrrrrrr", error);
    if (
      error == false &&
      (tokenName !== "") &
        (tokenSymbol != "") &
        (totalSupply != "") &
        (mintAddress != "") &
        (ownerAddress != "")
    ) {
      setShow(true);
    }
  };

  return (
    <>
      <div className="container swapwrap" style={{ marginLeft: "00px" }}>
        <div className="row">
          <div className="container container_inside token">
            <div className="token_modal">
              <div className="token_head_sec">
                <h2>Add Token</h2>
                <p>Please enter token name, symbol and token supply</p>
              </div>
              <ul>
                <li>
                  <div className="token_info d-flex mb-3">
                    <FormLabel className="text_head">Token Name</FormLabel>
                    <div className="input_text">
                      <input
                        label="Token Name"
                        type="text"
                        value={tokenName}
                        onKeyPress={(event) =>
                          (event.code >= 65 && event.code <= 90) ||
                          (event.code >= 97 && event.code <= 122)
                        }
                        onChange={(e) => handleChange(e, "tokenName")}
                      />
                      <span>{nameError}</span>
                    </div>
                  </div>
                </li>

                <li>
                  <div className="token_info d-flex mb-3">
                    <FormLabel className="text_head">Token Symbol</FormLabel>
                    <div className="input_text">
                      <input
                        label="Token Name"
                        type="text"
                        value={tokenSymbol}
                        onChange={(e) => handleChange(e, "tokenSymbol")}
                      />
                      <span>{symbolError}</span>
                    </div>
                  </div>
                </li>

                <li>
                  <div className="token_info d-flex mb-3">
                    <FormLabel className="text_head">Token Supply</FormLabel>
                    <div className="input_text">
                      <input
                        label="Token Name"
                        type="Number"
                        value={totalSupply}
                        onKeyDown={(evt) => {
                          symbolsArr.includes(evt.key) && evt.preventDefault();
                        }}
                        onChange={(e) => handleChange(e, "totalSupply")}
                      />
                      <span>{supplyError}</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="token_info d-flex mb-3">
                    <FormLabel className="text_head">Mint Address</FormLabel>
                    <div className="input_text">
                      <input
                        label="Token Name"
                        type="text"
                        value={mintAddress}
                        onChange={(e) => handleChange(e, "mintAddress")}
                      />
                      <span>{mintAddressError}</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="token_info d-flex mb-3">
                    <FormLabel className="text_head">Owner Address</FormLabel>
                    <div className="input_text">
                      <input
                        label="Token Name"
                        type="text"
                        value={ownerAddress}
                        onChange={(e) => handleChange(e, "ownerAddress")}
                        required="true"
                      />
                      <span>{ownerAddressError}</span>
                    </div>
                  </div>
                </li>
              </ul>

              <div className="token_footer">
                <Button variant="secondary" onClick={Preview}>
                  Preview
                </Button>
                
              </div>
              <PreviewAddTokenModal
                handleShow={handleShow}
                handleClose={handleClose}
                show={show}
                setShow={setShow}
                tokenName={tokenName}
                tokenSymbol={tokenSymbol}
                totalSupply={totalSupply}
                mintAddress={mintAddress}
                ownerAddress={ownerAddress}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddTokenModal;
