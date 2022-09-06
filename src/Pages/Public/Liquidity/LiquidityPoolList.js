import React, { useEffect, useState } from 'react'
import { retreivePoolInfoList } from '../../../services/api';
import './LiquidityPoolList.scss'
import { ExchangeService } from "../../../services/ExchangeService";
import { ContractServices} from "../../../services/ContractServices";
import { MAIN_CONTRACT_LIST } from '../../../assets/tokens';
import { useSelector } from 'react-redux';


const LiquidityPoolList = () => {

  const isUserConnected = useSelector((state) => state.persist.isUserConnected);
  const [poolList, setPoolList] = useState([]);
  const [pairBalance, setPairBalance]= useState([]);
  useEffect(() => {
    newPoolList();
  }, []);

  useEffect(() => {
    pairCall();
  }, [poolList]);

  //Fetching list from backend
  const newPoolList = () => {
     retreivePoolInfoList((poolInfoList) => {
      setPoolList([...poolInfoList]);
      
    });
  };
const pairCall =async () => {
  let pairBalArr = [];
  await Promise.all(poolList?.map(async(Ptoken) => {
    console.log("Ptoken.token1,Ptoken.token2",Ptoken.token1Addr,Ptoken.token2Addr);
    const pairList =await ExchangeService.getPair(Ptoken.token1Addr,Ptoken.token2Addr);
    console.log("pairList",pairList);

    /////////////contract call ////////////////
    const contract = await ContractServices.callContract(
      pairList,
      MAIN_CONTRACT_LIST.pair.abi
    );
    const balaceOfPair= await contract.methods.balanceOf(isUserConnected).call();
    const Dec_balaceOfPair =  balaceOfPair/ 10**18;
    const fix_balaceOfPair = Dec_balaceOfPair.toFixed(2);
      pairBalArr.push(fix_balaceOfPair);
    console.log("balaceOfPair",balaceOfPair);
    console.log("fix_balaceOfPair",fix_balaceOfPair);
    
  }));
  pairBalArr.length &&
  setPairBalance(pairBalArr);
}

  return (
   <>
    <div className='liquidity__content'>

      <div className='pool-list--container'>
        <div className='pool-list--heading'>
          <span>POOL</span>
          <span>LP BALANCE</span>
        </div>
        <ul className="pool-list--body">
            {poolList?.map((token, i) => (
              <li className='pool-list-item'>
                  <span>
                    {token.token1} / {token.token2}
                  </span>
                
                  <span>
                  {pairBalance[i]}
                  </span> 
             
              </li>
            ))}
            </ul>
        </div>
    </div>
    </>
  )
}

export default LiquidityPoolList