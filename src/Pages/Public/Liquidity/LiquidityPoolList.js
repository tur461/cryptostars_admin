import React, { useEffect, useState } from 'react'
import { retreivePoolInfoList } from '../../../services/api'


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
    <div>
        <ul>
        {poolList?.map((token) => (
          <div className="token_card">
            <li>{token.token1}/{token.token2}</li>
          </div>
        ))}
      </ul>
        
    </div>
  )
}

export default LiquidityPoolList