import React from "react";
import { Table, Pagination } from "react-bootstrap";
import "./Tokenlist.scss";

export const TokenList = () => {
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Token Name</th>
            <th>Symbol</th>
            <th>Address</th>
            <th>Total Supply</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
      <Pagination>
        <Pagination.Prev />
        <Pagination.Item>{1}</Pagination.Item>  
        <Pagination.Item>{2}</Pagination.Item>
        <Pagination.Item>{3}</Pagination.Item>
        <Pagination.Next />
      </Pagination>
    </div>
  );
};
