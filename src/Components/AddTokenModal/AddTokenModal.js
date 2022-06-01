import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./AddTokenModal.scss";
import "../../App.scss";
import "../../Pages/Public/Swap/Swap.scss";
import back from "../../assets/images/back-arrow.svg";
import { Modal, FormLabel, Button } from "react-bootstrap";

function AddTokenModal() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="container swapwrap">
        <div className="row">
          <div className="container container_inside token">
            <div className="token_modal">
              <ul>
                <li>
                  <div className="token_info d-flex mb-3">
                    <FormLabel className="text_head">Token Name</FormLabel>
                    <input label="Token Name" type="text" />
                  </div>
                </li>

                <li>
                  <div className="token_info d-flex mb-3">
                    <FormLabel className="text_head">Token Symbol</FormLabel>
                    <input label="Token Name" type="text" />
                  </div>
                </li>

                <li>
                  <div className="token_info d-flex mb-3">
                    <FormLabel className="text_head">Token Supply</FormLabel>
                    <input label="Token Name" type="number" />
                  </div>
                </li>

                <li>
                  <div className="token_info d-flex mb-3">
                    <FormLabel className="text_head">Address</FormLabel>
                    <input label="Token Name" type="number" />
                  </div>
                </li>
              </ul>

              <div className="token_footer">
                <Button variant="secondary" onClick={handleShow}>
                  Preview
                </Button>
                a
              </div>

              <Modal
                show={show}
                onHide={handleClose}
                className="modal_preview text-white"
              >
                <Link to="/liquidity">
                  <img src={back} alt="back_img" />
                </Link>
                <Modal.Body className="preview_content text-white">
                  <div className="token_info mb-3">
                    <FormLabel className="text_head">Token Name:</FormLabel>
                    <p>Etherium</p>
                  </div>
                  <div className="token_info mb-3">
                    <FormLabel className="text_head">Token Symbol:</FormLabel>
                    <p>Eth</p>
                  </div>
                  <div className="token_info mb-3">
                    <FormLabel className="text_head">Token Supply:</FormLabel>
                    <p>2208</p>
                  </div>
                  <div className="token_info mb-3">
                    <FormLabel className="text_head">Token Supply:</FormLabel>
                    <p>2208</p>
                  </div>
                </Modal.Body>
                <Modal.Footer className="token_footer">
                  <Button variant="secondary" onClick={handleClose}>
                    Submit
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddTokenModal;
