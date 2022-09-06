import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./PreviewToken.scss";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
import back from "../../assets/images/back-arrow.svg";
import Web3 from "web3";
import { Modal, FormLabel, Button } from "react-bootstrap";
import { ContractServices } from "../../services/ContractServices";
import { MAIN_CONTRACT_LIST } from "../../assets/tokens/index";
import { TokenList } from "../../Pages/Tokenlist/TokenList";
import { Provider, useDispatch } from "react-redux";
import { savetoken, startLoading, stopLoading } from "../../redux/actions";
import { BSC_SCAN, STR_CONSTANT } from "../../constant";
import checkicon from "../../assets/images/check_icon.svg";
import { saveTokenIconToDB, saveTokenInfoToDB } from "../../services/api";
import { useSelector } from "react-redux";
import { toast } from "../Toast/Toast";


// import xtype from "xtypejs";
function PreviewAddTokenModal({
  handleClose,
  handleShow,
  show,
  tokenIcon,
  setShow,
  tokenName,
  tokenSymbol,
  totalSupply,
  mintAddress,
  ownerAddress,
}) {
  const [data, setData] = useState();
  const [finalhash,setFinalhash] = useState('')
  const dispatch = useDispatch();
  const [result, setResult] = useState("");
  const [contractAddress, setContractAddress] = useState('');
  const priAccount = useSelector(s => s.persist.isUserConnected);

  const letsCallTheContract = async () => {
    try {
      if(!priAccount) return toast.error(STR_CONSTANT.CONNECT_WALLET);
      dispatch(startLoading())
      let contract = await ContractServices.callContract(
      MAIN_CONTRACT_LIST.tokenFactory.address,
      MAIN_CONTRACT_LIST.tokenFactory.abi
      );

      let callCreate = await contract.methods
      .create(
      tokenName,
      tokenSymbol,
      mintAddress,
      ContractServices.web3Object.utils.toWei(totalSupply, "ether"),
      ownerAddress
      )
      .send({ from: priAccount });
      const contract_address = await callCreate.events[0].address
      setContractAddress(contract_address);
      let cc = callCreate?.transactionHash
      setFinalhash(cc)
      if (cc !== "") {
        const iconName = `${tokenSymbol}_${Date.now()}.${tokenIcon.type.split('/')[1]}`;
        const token_obj = {
          icon: tokenIcon.name.split(' ').join('_'),
          name: tokenName,
          sym: tokenSymbol,
          addr: contract_address,
          dec: 18,
          supply: totalSupply,
        };
        console.log("PPP", token_obj.icon);

        const ress = saveTokenInfoToDB(token_obj, (d) => {
          saveTokenIconToDB(tokenIcon, iconName, _ => console.log('All data saved'));
        });

        console.log("ress", ress);
      }
      setResult(cc)
    } catch (error) {
      dispatch(stopLoading())
      return;
    }
    dispatch(stopLoading())
  };

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
        {result ? (
        <div className="whole">
          <Modal.Dialog className="confirmation_modal" centered>
            {/* <Modal.Header closeButton></Modal.Header> */}
            <Modal.Body>
            
            <img src={checkicon} alt="icon" />
              <a
                href={`${BSC_SCAN}tx/${finalhash}`}
                target="_blank"
                rel="noreferrer"
              >
                <p>View on Cronos Scan</p>
              </a>
           

              <Link to={"/tokenList"}>View Token</Link>
            </Modal.Body> 
          </Modal.Dialog>
        </div>
      ) : (
        ""
      )}
      </Modal>
      
    </div>
  );
}

export default PreviewAddTokenModal;
