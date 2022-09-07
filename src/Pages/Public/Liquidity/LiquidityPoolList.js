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
    const getBal = i => {
      if(i === poolList.length) {
        console.log('pool list:', poolList);
        console.log('bal list:', pairBalArr);
        return setPairBalance([...pairBalArr]);
      }
      ExchangeService.getPair(poolList[i].token1Addr,poolList[i].token2Addr)
      .then(pair => {
        console.log('pair:', pair);
        ContractServices.callContract(
          pair,
          MAIN_CONTRACT_LIST.pair.abi
        )
        .then(c => {
          c.methods.balanceOf(isUserConnected).call()
          .then(bal => {
            pairBalArr.push((bal/ 10**18).toFixed(4));
            getBal(i+1);
          })
        })
      })
    }
    poolList.length &&
    getBal(0);
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