import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import back from "../../assets/images/back-arrow.svg";
import Web3 from "web3";
import { Modal, FormLabel, Button } from "react-bootstrap";
import { ContractServices } from "../../services/ContractServices";
import { MAIN_CONTRACT_LIST } from "../../assets/tokens/index";
// import xtype from "xtypejs";
function PreviewAddTokenModal({
  handleClose,
  handleShow,
  show,
  setShow,
  tokenName,
  tokenSymbol,
  totalSupply,
  mintAddress,
  ownerAddress,
}) {
  //   const [show, setShow] = useState(false);
  //   const handleClose = () => setShow(false);
  //   const handleShow = () => setShow(true);
  // const [token, setToken] = useState({});
  useEffect(async () => {
    let contract = await ContractServices.callContract(
      "0xAeD9eB10741eEe2340A308029D1A905F1F2a4625",
      MAIN_CONTRACT_LIST.clonedToken.abi
    );
    //0xfdce5F5FbBC561719fd459ebb665705A9Ed6B2ad
    // console.log("hahahahahahahahaahahaha", contract);
    tokenObject.name = await contract.methods.name().call();
    tokenObject.symbol = await contract.methods.symbol().call();
    console.log("adress1 gotcha", tokenObject.name);
    console.log("symbol1 gotcha", tokenObject.symbol);
    //-------------------------------------------
    contract = await ContractServices.callContract(
      "0x1b0fF6793078034D4005473bAC0CE8FfC83Dfc6E",
      MAIN_CONTRACT_LIST.clonedToken.abi
    );
    tokenObject.name = await contract.methods.name().call();
    tokenObject.symbol = await contract.methods.symbol().call();
    console.log("adress2 gotcha", tokenObject.name);
    console.log("symbol2 gotcha", tokenObject.symbol);
  }, []);
  console.log("mmmmm", totalSupply);
  let web3 = new Web3(window.ethereum);
  let tokenObject = { name: "", symbol: "", totalSupply: "" };
  const letsCallTheContract = async () => {
    let contract = await ContractServices.callContract(
      MAIN_CONTRACT_LIST.tokenFactory.address,
      MAIN_CONTRACT_LIST.tokenFactory.abi
    );
    let userAddress = await ContractServices.isMetamaskInstalled();

    let callCreate = await contract.methods
      .create(
        tokenName,
        tokenSymbol,
        mintAddress,
        web3.utils.toWei(totalSupply, "ether"),
        ownerAddress
      )
      .send({ from: userAddress });
    console.log("callCreate", callCreate);
    let tokenAddresess = await contract.methods.getCitizenAddress().call();
    let tokenAddressArray = tokenAddresess;
    console.log(userAddress, "userAddress");
    arrayItration(tokenAddressArray);
    console.log("arrry hai", tokenAddressArray);
  };
  const arrayItration = async (array) => {
    let contract;
    let tokenDetails = [];
    let newArray = [...array];

    alert("haha i got you");
    let count = 0;

    const promises = newArray.map(async (item, index) => {
      // console.log(item, index, "item", "index");
      contract = await ContractServices.callContract(
        item,
        MAIN_CONTRACT_LIST.clonedToken.abi
      );
      //0xfdce5F5FbBC561719fd459ebb665705A9Ed6B2ad
      console.log("hahahahahahahahaahahaha", contract);
      let name1 = await contract.methods.name().call();
      let totalSupply1 = await contract.methods.totalSupply().call();
      return {
        symbol: await contract.methods.symbol().call(),
        name: name1,
        totalSupply: totalSupply1,
      };
    });
    console.log(await Promise.all(promises), "promises");
    count += 1;
    return await Promise.all(promises);
  
    // tokenObject.totalSupply = await contract.methods.totalSupply().call();
    console.log(tokenObject.name, count, "ye raha naam token aka");
    console.log(tokenObject.symbol, count, "ye raha symbol token aka");
    // setToken(tokenObject);
    // console.log(token, "aa gya token");
    // let tokenArray = [];
    // tokenArray.push(token);
    // tokenDetails.push(...tokenArray, token);

    // console.log("ye hai tokenDetails", tokenDetails);
  };

  //0x5D0CbFEBc66D6D0282c1DD9146Ef79f3C4EA5629
  console.log(tokenObject.name, "  tokenObject.name last");
  console.log(
    tokenName,
    tokenSymbol,
    totalSupply,
    mintAddress,
    ownerAddress,
    "oooo"
  );
  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        className="modal_preview text-white"
      >
        <Link to="#">
          <img src={back} alt="back_img" onClick={() => setShow(false)} />
        </Link>
        <Modal.Header className="token_head_sec">
          <h2>Confirm Token Details.</h2>
          {/* <p>Please enter token name, symbol and token supply</p> */}
        </Modal.Header>
        <Modal.Body className="preview_content text-white">
          <div className="token_info mb-3">
            <FormLabel className="text_head">Token Name:</FormLabel>
            <p>{tokenName}</p>
          </div>
          <div className="token_info mb-3">
            <FormLabel className="text_head">Token Symbol:</FormLabel>
            <p>{tokenSymbol}</p>
          </div>
          <div className="token_info mb-3">
            <FormLabel className="text_head">Total Supply:</FormLabel>
            <p>{totalSupply}</p>
          </div>
          <div className="token_info mb-3">
            <FormLabel className="text_head">Mint Address:</FormLabel>
            <p>
              {mintAddress.slice(0, 8) +
                " ....... " +
                mintAddress.slice(35, 42)}
            </p>
          </div>
          <div className="token_info mb-3">
            <FormLabel className="text_head">Owner Address:</FormLabel>
            <p>
              {ownerAddress.slice(0, 8) +
                " ....... " +
                ownerAddress.slice(35, 42)}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer className="token_footer">
          <Button
            variant="secondary"
            onClick={letsCallTheContract}
            style={{ marginTop: "-1200px" }}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PreviewAddTokenModal;
