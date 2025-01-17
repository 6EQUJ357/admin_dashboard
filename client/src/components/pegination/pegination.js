import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import "./pegination.css";

const Pegination = ({ onPageChange, pageCount }) => {


    //   Begin Pagination
    // const [currentItems, setCurrentItems] = useState([]);
    // const [pageCount, setPageCount] = useState(0);
    // const [itemOffset, setItemOffset] = useState(0);
    // const itemsPerPage = 5;
  
    // useEffect(() => {
    //   const endOffset = itemOffset + itemsPerPage;
  
    //   setCurrentItems(items.slice(itemOffset, endOffset));
    //   setPageCount(Math.ceil(items.length / itemsPerPage));
    // }, [itemOffset, itemsPerPage, items]);
  
    // const handlePageClick = (event) => {
    //   const newOffset = (event.selected * itemsPerPage) % items.length;
    //   setItemOffset(newOffset);
    // };

    //Pagination ends


  return (
    
        <ReactPaginate
        breakLabel="..."
        nextLabel="Next"
        onPageChange={onPageChange}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="Prev"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName="activePage"
        />
   
  )
}

export default Pegination