import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./AddTokenModal.scss";
import "../../App.scss";
import "../../Pages/Public/Swap/Swap.scss";
import back from "../../assets/images/back-arrow.svg";
import { Modal, FormLabel, Button } from "react-bootstrap";
import PreviewAddTokenModal from "./PreviewAddTokenModal";

function AddTokenModal() {
  let refrenceVariable = false;
  const [show, setShow] = useState(false);
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [totalSupply, setTotalSupply] = useState("");
  const [mintAddress, setMintAddress] = useState("");
  const [ownerAddress, setOwnerAddress] = useState("");

  const handleChange = (e, fieldName) => {
    switch ((e, fieldName)) {
      case "tokenName":
        setTokenName(e.target.value);
        break;
      case "tokenSymbol":
        setTokenSymbol(e.target.value);
        break;
      case "totalSupply":
        setTotalSupply(e.target.value.toString());
        break;
      case "mintAddress":
        setMintAddress(e.target.value);
        refrenceVariable = true;
        break;
      case "ownerAddress":
        setOwnerAddress(e.target.value);
        refrenceVariable = true;
        break;
      default:
        console.log("default case");
    }
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log("token ka naam", tokenName);
  return (
    <>
      <div className="container swapwrap">
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
                    <input
                      label="Token Name"
                      type="text"
                      value={tokenName}
                      onChange={(e) => handleChange(e, "tokenName")}
                    
                    />
                  </div>
                </li>

                <li>
                  <div className="token_info d-flex mb-3">
                    <FormLabel className="text_head">Token Symbol</FormLabel>
                    <input
                      label="Token Name"
                      type="text"
                      value={tokenSymbol}
                      
                      onChange={(e) => handleChange(e, "tokenSymbol")}
                    />
                  </div>
                </li>

                <li>
                  <div className="token_info d-flex mb-3">
                    <FormLabel className="text_head">Token Supply</FormLabel>
                    <input
                      label="Token Name"
                      type="Number"
                      value={totalSupply}
                      onChange={(e) => handleChange(e, "totalSupply")}
                    />
                  </div>
                </li>
                <li>
                  <div className="token_info d-flex mb-3">
                    <FormLabel className="text_head">Mint Address</FormLabel>
                    <input
                      label="Token Name"
                      type="text"
                      value={mintAddress}
                      onChange={(e) => handleChange(e, "mintAddress")}
                    />
                  </div>
                </li>
                <li>
                  <div className="token_info d-flex mb-3">
                    <FormLabel className="text_head">Owner Address</FormLabel>
                    <input
                      label="Token Name"
                      type="text"
                      value={ownerAddress}
                      onChange={(e) => handleChange(e, "ownerAddress")}
                      required="true"
                    />
                  </div>
                </li>
              </ul>

              <div className="token_footer">
                <Button variant="secondary" onClick={handleShow}>
                  Preview
                </Button>
                a
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
