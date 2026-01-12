/* eslint-disable react/prop-types */
import { CPagination, CPaginationItem } from '@coreui/react'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i)
  }
  useEffect(function () {
    let pageList = document.getElementsByClassName('page-link')

    for (let i = 0; i < pageList.length; i++) {
      pageList[i].style.backgroundColor = 'white'
    }
  })

  return (
    <div>
      <nav>
        <CPagination className="pagination" style={{ marginTop: '30px' }}>
          {pageNumbers.map((number, index) => (
            <CPaginationItem
              className="pageItem"
              key={index}
              onClick={(e) => {
                paginate(number)
              }}
            >
              {number}
            </CPaginationItem>
          ))}
        </CPagination>
      </nav>
    </div>
  )
}

export default Pagination
