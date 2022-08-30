import React from 'react';

const Pagination = ({ postsPerPage, totalPosts,currentPage,lastdata,paginate}) => {

  const pageNumbers = [];
console.log("endlistdata",lastdata);
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  console.log("postsPerPage",postsPerPage);

  return (
    <nav>

      <ul className='pagination'>

        {currentPage!==1?<button onClick={()=>{paginate(currentPage-1)}}>previous</button>:''}
        {
        pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <a onClick={() => paginate(number)}  className='page-link'>
                              {number}
            </a>
          </li>
        ))
        }
        {lastdata>=10?<button onClick={()=>{paginate(currentPage+1)}}>next</button>:""}
      </ul>
    </nav>
  );
};

export default Pagination;