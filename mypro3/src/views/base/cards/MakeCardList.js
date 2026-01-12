/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import {
  CTable,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableDataCell,
  CTableBody,
} from '@coreui/react'

class MakeCardList extends Component {
  render() {
    return (
      <>
        <CTable striped style={{ textAlign: 'center' }} hover>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">과정</CTableHeaderCell>
              <CTableHeaderCell scope="col">프로젝트명</CTableHeaderCell>
              <CTableHeaderCell scope="col">주제형태</CTableHeaderCell>
              <CTableHeaderCell scope="col">수상여부</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {this.props.data.map((arr, index) => (
              <CTableRow key={index} color="default">
                <CTableHeaderCell scope="row">{arr.curri_name}</CTableHeaderCell>
                <CTableDataCell>{arr.pro_name}</CTableDataCell>
                <CTableDataCell>{arr.pro_type}</CTableDataCell>
                <CTableDataCell>{arr.pro_prize}</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </>
    )
  }
}

export default MakeCardList
