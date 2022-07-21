import React, { useState,useEffect } from "react";
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
  // const [errorCount, setErrorCount] = useState("0");

  const [nameError, setnameError] = useState("");
  const [symbolError, setSymbolError] = useState("");
  const [supplyError, setSupplyError] = useState("");
  const [mintAddressError, setMintAddressError] = useState("");
  const [ownerAddressError, setOwnerAddressError] = useState("");






  const handleChange = (e, fieldName) => {
    switch ((e, fieldName)) {
      case "tokenName":
        e.target.value==''?setnameError("Please Enter Token Name"):setnameError('')
        setTokenName(e.target.value);
        break;
      case "tokenSymbol":
        e.target.value==''?setSymbolError("Please Enter Token Name"):setSymbolError('')
        setTokenSymbol(e.target.value);
        break;
      case "totalSupply":
        e.target.value==''?setSupplyError("Please Enter Token Supply"):setSupplyError('')
        setTotalSupply(e.target.value.toString());
        break;
      case "mintAddress":
        e.target.value==''?setMintAddressError("Please Enter Mint Address"):setMintAddressError('')
        setMintAddress(e.target.value);
        refrenceVariable = true;
        break;
      case "ownerAddress":
        e.target.value==''?setOwnerAddressError("Please Enter Owner Address"):setOwnerAddressError('')
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


   const Preview = () =>{
    if(tokenName=='')
    {
     setnameError("Please Enter Token Name")
    }
    else if(tokenSymbol=='')
    {
      setSymbolError("Please Enter Token Symbol")
    }
    else if(totalSupply=='')
    {
      setSupplyError("Please Enter Token TotalSupply") 
    }
    else if(mintAddress=='')
    {
      setMintAddressError("Please Enter Mint Address")
    }
    else if(ownerAddress=='')
    {
      setOwnerAddressError("Please Enter Owner Address")
    }

    else{
      setShow(true)
    }
    
    
   }
    // if(tokenName=='')
    // {
    //   setnameError("Please Enter Token Name")
    // }
  
  



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

                  <span style={{color:'red',}}>{nameError}</span>
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
                  <span style={{color:'red'}}>{symbolError}</span>
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
                  <span style={{color:'red'}}>{supplyError}</span>
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
                  <span style={{color:'red'}}>{mintAddressError}</span>
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
                  <span style={{color:'red'}}>{ownerAddressError}</span>
                </li>
              </ul>

              <div className="token_footer">
                <Button variant="secondary" onClick={Preview}>
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
