import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { ContractServices } from "../../services/ContractServices";
import { MAIN_CONTRACT_LIST } from "../../assets/tokens/index";
import { toast } from "../../Components/Toast/Toast";
import Pagination from "./Pagination";
import { CopyToClipboard } from "react-copy-to-clipboard";
import copyIcon from "../../assets/images/icon_copyAddress.png";
// import Skeleton from 'react-loading-skeleton'
// import 'react-loading-skeleton/dist/skeleton.css'
import SkeletonCard from "./SkeletonCard";

import "./Tokenlist.scss";
import { selectText } from "../../services/utils";
import { useSelector } from "react-redux";

export const TokenList = ({ data }) => {
  console.log("", data);
  const [bbb, setBBewq] = useState(data);
  const [listdata, setListdata] = useState([]);
  const [totalpost,setTotalposts] = useState('')
  const [isloading, setLoading] = useState(true);
  const [currentPosts,setCurrentPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [endlist,setEndlist] = useState(10)

  const functionThatReturnsAPromise = async (item) => {
    //a function that returns a promise

    let contract = await ContractServices.callContract(
      item,
      MAIN_CONTRACT_LIST.clonedToken.abi
    );
    //0xfdce5F5FbBC561719fd459ebb665705A9Ed6B2ad

    let symbol = await contract.methods.symbol().call();
    let name = await contract.methods.name().call();
    let totalSupply = await contract.methods.totalSupply().call();
    return Promise.resolve({
      symbol,
      name,
      totalSupply,
      item,
    });
  };

  const doSomethingAsync = async (item) => {
    return await functionThatReturnsAPromise(item);
  };

  const getAnsArr = async (array) => {
    console.log("zzzzzzzzzzzzzz",array);
    let count;
    let map = [];
    console.log("arraghy", array);
    let promises = array.map(async (item) => {
      return await doSomethingAsync(item);
    });
    let data = await Promise.all(promises);
    console.log(data, "yw ahi final daata");

    return Promise.all(promises);
  };

  const tokenlistdata = async () => {
    let contract = await ContractServices.callContract(
      MAIN_CONTRACT_LIST.tokenFactory.address,
      MAIN_CONTRACT_LIST.tokenFactory.abi
    );
    let tokenAddresess = await contract.methods.getCitizenAddress().call();
    console.log("rrrrrrrrrrrrrrrrr", tokenAddresess);
    setTotalposts(tokenAddresess.length)
   
     // Get current posts
     console.log("cuuuu",currentPage,postsPerPage,postsPerPage);
     const indexOfLastPost = currentPage * postsPerPage;
     const indexOfFirstPost = indexOfLastPost - postsPerPage;
     console.log("hhhhhhhhhhhhhh",indexOfLastPost,indexOfFirstPost);
    // const currentPosts = arrayoflist.slice(indexOfFirstPost, indexOfLastPost);
     const _currentposts = tokenAddresess?.slice(indexOfFirstPost, indexOfLastPost);

    console.log("rrrrrrrrrkkkkkkkkk",_currentposts);
  

    console.log("ffffffffffff",_currentposts);

    setCurrentPosts([..._currentposts])
  
    console.log("nnnnnnnnnnnnnnn",_currentposts);
    setLoading(true)
    const list = await getAnsArr(_currentposts);
    let arrayoflist = list.reverse()
    console.log("jjjjjjjjjjjjjjjjj", arrayoflist);
   
    setListdata(arrayoflist);
    if(list.length<10){
      setEndlist(list.length)
    }
    setLoading(false);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    

  }

  

  useEffect(() => {
    tokenlistdata();
  
  }, [currentPage]);
  
  

  console.log("llllllllllllllllllkkkkkkkkkk", listdata, isloading,endlist);
  let arrayoflist = listdata.reverse()
  console.log("vvvvvvvvvvvv",arrayoflist);
  

console.log("listdata",listdata.length);
  
  const trunc = (a) => `${a.slice(0, 5)}...${a.slice(39, 42)}`;
  const isUserConnected = useSelector((state) => state.persist.isUserConnected);
  

  return (
    <div className="table_responsive">
      {isloading && <SkeletonCard />}
      {!isloading ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Token Name</th>
              <th>Symbol</th>
              <th>Address</th>
              <th>Total Supply</th>
            </tr>
          </thead>

          {listdata?.map((item) => (
            <tbody>
              <tr key={item}>
                <td>{item?.name}</td>
                <td>{item?.symbol}</td>
                <td>
                  <p>
                    <span id={btoa(item?.item)}>{trunc(item?.item)}</span>
                    <CopyToClipboard
                      text={item?.item}
                      onCopy={() => {
                        selectText(
                          document.querySelector(`#${btoa(item?.item)}`)
                        );
                        toast.success("Copied!");
                      }}
                    >
                      <img
                        className="copy-icon cursor--pointer"
                        src={copyIcon}
                        alt="copy"
                      />
                    </CopyToClipboard>
                  </p>
                </td>
                <td>{item?.totalSupply}</td>
              </tr>
            </tbody>
          ))}
        </Table>
      ) : (
        ""
      )}
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={totalpost}
        currentPage={currentPage}
        lastdata = {listdata.length}
        paginate={paginate}
      />
    </div>
  );
};
