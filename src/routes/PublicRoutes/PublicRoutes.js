import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { useLocation, withRouter } from "react-router";
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Home from "../../Pages/Public/Home/Home";
import Swap from "../../Pages/Public/Swap/Swap";
import Liquidity from "../../Pages/Public/Liquidity/Liquidity";
import Farm from "../../Pages/Public/Farm";
import Oceans from "../../Pages/Public/Oceans/Oceans";
import Lottery from "../../Pages/Public/Lottery/Lottery";
import { HOME_ROUTE } from "../../constant";
import Pools from "../../Pages/Public/Pools/Pools";
import AddTokenModal from "../../Components/AddTokenModal/AddTokenModal";
import Referrals from "../../Pages/Public/Referrals/Referrals";
import ReactGA from "react-ga";
import { TokenList } from "../../Pages/Tokenlist/TokenList";
import { useSelector } from "react-redux";
import "./Publicrouter.scss"
import ConnectWalletModal from "../../Components/ConnectWalletModal";
const PublicRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.initialize("UA-203869190-3");
    ReactGA.pageview(location.pathname + location.search);
  }, [location]);

  const [small, setSmall] = useState(false);
  const [navCollapse, setNavCollapse] = useState(false);
  const [tradeDropdown, openCloseTradeDropdown] = useState(false);
  const isUserConnected = useSelector((state) => state.persist.isUserConnected);
  // constconnect==false = useSelector((state) => state.persist.isUserConnected);
  const [connect , setConnect] = useState(false)
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [isOpen, setModal] = useState(false);
  


  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () =>
        setSmall(window.pageYOffset > 200)
      );
    }
  }, []);

  const handleNavCollapse = () => {
    setNavCollapse((prevNavCollapse) => !prevNavCollapse);
    if (navCollapse === false) {
      document.body.className = "expande_container";
      // return () => { document.body.className = ''; }
    } else {
      document.body.className = "";
    }
  };

  const handleSubNav = () => {
    setNavCollapse((prevNavCollapse) => prevNavCollapse);
  };

  const connectmodal = ()=>{
    isUserConnected || setShowWalletModal(!0);
  }
   
    return  (
			<div>
	{console.log("isUserConnectedisUserConnected",isUserConnected)}

				{
 
					isUserConnected ?
					<>
						<Header 
							mobileIcon={navCollapse} 
							small_nav={() => handleNavCollapse()} 
							className={`fixed ${small ? "isFixed" : ""}`} 
						/>
						<Sidebar
							// tradeDropdown={!tradeDropdown}
							showSocial={navCollapse}
							closeSidebar={() => handleNavCollapse()}
							onClickOpenSidebar={() => handleSubNav()}
							onOpenChange={(open) => openCloseTradeDropdown(!open)}
							tradeDropdown={() => navCollapse && handleNavCollapse()}
							className={`fixed ${small ? "isFixed" : ""} ${navCollapse ? "small_nav" : ""}`}
						/>
						<Switch>
							<Route path={HOME_ROUTE} component={Liquidity} exact={true} />
							<Route path={`${HOME_ROUTE}swap`} component={Swap} exact={true} />
							<Route path={`${HOME_ROUTE}farm`} component={Farm} exact={true} />
							<Route path={`${HOME_ROUTE}r/:ref`} component={Home} exact={true} />
							<Route path={`${HOME_ROUTE}pools`} component={Pools} exact={true} />
							<Route path={`${HOME_ROUTE}oceans`} component={Oceans} exact={true} />
							<Route path={`${HOME_ROUTE}lottery`} component={Lottery} exact={true} />
							<Route path={`${HOME_ROUTE}liquidity`} component={Liquidity} exact={true}/>
							<Route path={`${HOME_ROUTE}tokenList`} component={TokenList} exact={true} />
							<Route path={`${HOME_ROUTE}referrals`} component={Referrals} exact={true} />
							<Route path={`${HOME_ROUTE}addmodal`} component={AddTokenModal}  exact={true} />
						</Switch>
					</> :
					<div className="connect--main">
						{showWalletModal && <ConnectWalletModal setShowModal={setShowWalletModal} />}
						<div className="connect_box">
						<h2>Connect Wallet</h2>
						<button className="btn--connect-main btn-pill" onClick={connectmodal}> Connect</button>
						</div>
					</div>
				}
			</div> 
    );
      
      
     
      
};

export default withRouter(PublicRoutes);
