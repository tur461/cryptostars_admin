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
import { LocalStore, selectText } from "../../services/utils";
import { LS_KEYS, PAGE_SIZE } from "../../services/constants";

export const TokenList = ({ data }) => {
  console.log("", data);
  const [bbb, setBBewq] = useState(data);
  const [listdata, setListdata] = useState([]);
  const [isloading, setLoading] = useState(true);
  //   const [pageData,setPageData] = useState({
  //     perPage: 10,
  //     page: 1,
  //     pages: 1
  // })

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(PAGE_SIZE);

  // const handlePageClick = (event) => {
  //   console.log(event);
  //   let page1= event.selected;
  //   console.log("kkkkk",page1);
  //   setPageData({...pageData, page:page1})

  // }


  const getTokenInfo = async addr => {
    let contract = await ContractServices.callContract(
      addr,
      MAIN_CONTRACT_LIST.clonedToken.abi
    );

    return {
      addr,
      name: await contract.methods.name().call(),
      sym: await contract.methods.symbol().call(),
      supply: await contract.methods.totalSupply().call(),
    }
  }

  const getTokenListInfos = async (start, end) => {
    const tokenInfoList = [];
    const addresses = JSON.parse(LocalStore.get(LS_KEYS.TOKEN_ADDR_LIST));
    async addr => await getTokenInfo(addr);
    for(let i=start; i < end && i < addresses.length; ++i ) tokenInfoList.push(await getTokenInfo(addresses[i]));
    return tokenInfoList;
  }

  const getAddrList = _ => [
    (currentPage - 1) * PAGE_SIZE, lastIndex, 
    currentPage * PAGE_SIZE - 1
  ];

  const tryGetTokenListInfosFromChache = (start, end) => {

    const data = JSON.parse(LocalStore.get(LS_KEYS.TOKEN_INFO_LIST) || '[]');
    if(!data.length) return data;
    return data.slice(start, end+1);
  }

  // function to be called from UI
  const getDataForCurrentPage = async _ => {
    const idxInterval = getAddrList();
    let list  = tryGetTokenListInfosFromChache(...idxInterval);
    if(!list.length) list = await getTokenListInfos(...idxInterval);
    else return list;
    const oldList = JSON.parse(LocalStore.get(LS_KEYS.TOKEN_INFO_LIST) || '[]');
    LocalStore.add(LS_KEYS.TOKEN_INFO_LIST, JSON.stringify([...oldList, ...list]));
    return list;
  }

  const getAnsArr = async (array) => {
    let count;
    let map = [];
    // console.log("arraghy", array);
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
    LocalStore.add(LS_KEYS.TOKEN_ADDR_LIST, JSON.stringify(tokenAddresess));

    console.log("tokenAddresess.tokenlist", tokenAddresess);

    const list = await getAnsArr(tokenAddresess);
  let arrayoflist = list.reverse()

    setListdata(arrayoflist);
    setLoading(false);
  };
  useEffect(() => {
    tokenlistdata();
  }, []);
  // console.log("llllllllllllllllllkkkkkkkkkk", listdata);
  let arrayoflist = listdata.reverse()
  // console.log("vvvvvvvvvvvv",arrayoflist);
  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = arrayoflist.slice(indexOfFirstPost, indexOfLastPost);
  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const trunc = (a) => `${a.slice(0, 5)}...${a.slice(39, 42)}`;

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

          {currentPosts?.map((item) => (
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
      {/* <Pagination>
        <Pagination.Prev />
        <Pagination.Item>{1}</Pagination.Item>
        <Pagination.Item>{2}</Pagination.Item>
        <Pagination.Item>{3}</Pagination.Item>
        <Pagination.Next />
      </Pagination> */}
      {/* <ReactPaginate
                          previousLabel={'<<'}
                          nextLabel={'>>'}
                          pageCount={pageData?.pages}
                          onPageChange={handlePageClick}
                          containerClassName={'pagination'}
                          activeClassName={'active'}
                      /> */}
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={listdata.length}
        paginate={paginate}
      />
    </div>
  );
};
