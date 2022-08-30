import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import "./Header.scss";
import { Link } from "react-router-dom";
import { ReactComponent as MenuIcon } from "../../assets/images/menu_toggle_icon.svg";
import { ReactComponent as Iconfeathermenu } from "../../assets/images/Icon-feather-menu.svg";
import { login, logout, versionManager } from "../../redux/actions";
import { ContractServices } from "../../services/ContractServices";
import ProfileModal from "../ProfileModal/ProfileModal";
import Logo from "../../assets/images/logo_crypto.png";
import { toast } from "../Toast/Toast";
import { HOME_ROUTE } from "../../constant";
import WalletConnectProvider from "@walletconnect/web3-provider";
import ConnectWalletModal from "../ConnectWalletModal";
// import Web3 from "web3";
const Header = (props) => {
  // const {web3} = window;
  const dispatch = useDispatch();
  const [walletShow, setWalletShow] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);

  const isUserConnected = useSelector((state) => state.persist.isUserConnected);
  const walletType = useSelector((state) => state.persist.walletType);

  useEffect(() => {
    const init = async () => {
      await dispatch(versionManager());
      if (walletType) {
        await ContractServices.setWalletType(walletType);
      } else {
        dispatch(logout());
      }
    };
    init();
    addListeners();
    if (walletType === "Walletconnect") {
      setProvider();
    }
  }, []);
  const setProvider = async () => {
    const provider = new WalletConnectProvider({
      //infuraId: "8570afa4d18b4c5d9cb3a629b08de069",
      rpc: {
        97: "https://data-seed-prebsc-2-s3.binance.org:8545/",
        56: "https://bsc-dataseed.binance.org/",
      },
      chainId: 56,
      network: "binance",
      qrcode: true,
      qrcodeModalOptions: {
        mobileLinks: [
          "rainbow",
          "metamask",
          "argent",
          "trust",
          "imtoken",
          "pillar",
        ],
        desktopLinks: ["encrypted ink"],
      },
    });
    const results = await provider.enable();
    await ContractServices.callWeb3ForWalletConnect(provider);
  };

  const addListeners = async () => {
    let address;
    if (walletType === "Metamask") {
      address = await ContractServices.isMetamaskInstalled("");
    }
    if (walletType === "BinanceChain") {
      address = await ContractServices.isBinanceChainInstalled();
    }

    ContractServices.walletWindowListener();
    if (address) {
      window.ethereum.on("accountsChanged", function (accounts) {
        const account = accounts[0];
        // dispatch(login({ account, walletType }));
        window.location.reload();
      });
    }
  };
  const loginCall = async (walletType) => {
    try {
      if (walletType === "BinanceChain") {
        const account = await ContractServices.isBinanceChainInstalled();
        if (account) {
          dispatch(login({ account, walletType }));
          setWalletShow(false);
        }
      } else {
        const account = await ContractServices.isMetamaskInstalled("");
        if (account) {
          dispatch(login({ account, walletType }));
          setWalletShow(false);
        }
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  const logoutCall = () => {
    console.log("ooooooooooooooooo");
    dispatch(logout());
    setShowWalletModal(false);
    localStorage.clear();

  };
  const connectCall = () => {
    isUserConnected ? setShowWalletModal(!showWalletModal) : setWalletShow(true);
  };

  useEffect(() => {
    window.ethereum.on('accountsChanged', function (accounts) {
      dispatch(logout());
      // Time to reload your interface with accounts[0]!
      // console.log("ggggggggg",accounts[0]);
      localStorage.clear();
    
      window.location.reload()
      
      // setShowWalletModal(false);
    })
  }, [isUserConnected])
  



  return (
    <div className={`header_style ${props.className}`}>
      <div className="header_left_style">
        <div className="for_desktop">
          <Link to="#" onClick={props.small_nav}>
            {props.mobileIcon ? (
              <Iconfeathermenu className="desk" />
            ) : (
              <MenuIcon className="mobile" />
            )}
          </Link>
        </div>

        <div className="for_mobile">
          <Link to="#" onClick={props.small_nav}>
            {props.mobileIcon ? (
              <MenuIcon className="mobile" />
            ) : (
              <Iconfeathermenu className="desk" />
            )}
          </Link>
        </div>
        <Link to={`${HOME_ROUTE}home`} className="header_logo">
          <img src={Logo} alt="icon" />
        </Link>
      </div>
      <div className="header_right_style">
        <Link
          to="#"
          className="btn connect__Link"
          onClick={() => connectCall()}
        >
          {isUserConnected
            ? `${isUserConnected.substring(1, 6)}...${isUserConnected.substr(
                isUserConnected.length - 4
              )}`
            : "Connect"}
        </Link>
      </div>
      {showWalletModal && (
        <ProfileModal
          closeModal={() => setShowWalletModal(!showWalletModal)}
          address={isUserConnected}
          logout={logoutCall}
        />
      )}
      {walletShow && <ConnectWalletModal showModal={setWalletShow} />}
    </div>
  );
};

export default withRouter(Header);
