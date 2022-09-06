import React, { useEffect, useRef, useState } from "react";
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
import WalletList from "./WalletList";
import { EVENTS, HOME_ROUTE, WALLET_TYPE } from "../../constant";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { clearEnv, LocalStore, notEqual, rEqual } from "../../services/utils";
import { LS_KEYS } from "../../services/constants";
import { WalletService } from "../../services/WalletServices";

const Header = (props) => {
  const dispatch = useDispatch();
  const [isOpen, setModal] = useState(!1);
  const [walletShow, setWalletShow] = useState(!1);

  const isUserConnected = useSelector((state) => state.persist.isUserConnected);

  const lock = useRef(!0);

  useEffect(() => {
    if(lock.current) {
      dispatch(versionManager());
      const wType = LocalStore.get(LS_KEYS.WALLET_TYPE);
      if(wType && notEqual(wType, WALLET_TYPE.NONE)) {
        LocalStore.add(LS_KEYS.WALLET_TYPE, wType);
        WalletService.setupWalletEventListeners(wType);
        dispatch(login({account: isUserConnected, walletType: wType}));
      } else {
        console.log('wType:', wType, notEqual(wType, WALLET_TYPE.NONE));
        // dispatch(logout())
      }
      lock.current = !1;  
    }
  }, []);
  
  const logoutCall = () => {
    
    dispatch(logout());
    setModal(!1);
    clearEnv();
  };

  const connectCall = () => {
    isUserConnected ? setModal(!isOpen) : setWalletShow(!0);
  };

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
      {isOpen && (
        <ProfileModal
          closeModal={() => setModal(!isOpen)}
          address={isUserConnected}
          logout={logoutCall}
        />
      )}
      {walletShow && <WalletList isWalletShow={setWalletShow} />}
    </div>
  );
};

export default withRouter(Header);
