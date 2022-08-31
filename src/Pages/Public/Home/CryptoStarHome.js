import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import ConnectWalletModal from "../../../Components/Connect/ConnectWalletModal";



const CryptoStarHome = () => {
    
    const [showWalletModal, setShowWalletModal] = useState(false);
    const isUserConnected = useSelector( (state) =>state.persist.isUserConnected);
console.log("isUserConnected",isUserConnected);
    const connectmodal = () => {
      isUserConnected || setShowWalletModal(!0);
      console.log("Hit")
    };

  return (
    <div className="connect--main">
      {showWalletModal && (
        <ConnectWalletModal setShowModal={setShowWalletModal} />
      )}
      {!isUserConnected &&
      <div className="connect_box">
        <h2>Connect Wallet</h2>
        <button className="btn--connect-main btn-pill" onClick={connectmodal}>
          {" "}
          Connect
        </button>
      </div>}
        {isUserConnected && <h1>Welcome to Crypto Star</h1>}
    </div>
  );
}

export default CryptoStarHome