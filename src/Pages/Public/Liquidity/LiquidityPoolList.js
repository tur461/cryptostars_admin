import React, { useEffect, useState } from 'react'
import { retreivePoolInfoList } from '../../../services/api';
import './LiquidityPoolList.scss'


const LiquidityPoolList = () => {

    const [poolList, setPoolList] = useState([]);

    useEffect(() => {
        newPoolList();
      }, []);

//Fetching list from backend
  const newPoolList = () => {
    const result = retreivePoolInfoList((poolInfoList) => {
      console.log("Result>>>>", poolInfoList);
      setPoolList([...poolInfoList]);
    });
  };
  console.log("aaaaaaaaaaaaa",poolList);
  return (
    <div className='liquidity__content'>
        <ul>
        {poolList?.map((token) => (
          <div className="token_card">
            <li>{token.token1}/{token.token2}</li>
            {/* <li className='token_card_title'>heading</li> */}
            {/* <li>5000</li> */}
            
          </div>
        ))}
      </ul>
        
    </div>
  )
}

export default LiquidityPoolList