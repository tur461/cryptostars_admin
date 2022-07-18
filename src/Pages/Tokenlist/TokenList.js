import React, { useState } from "react";
import { Table, Pagination } from "react-bootstrap";
import "./Tokenlist.scss";

export const TokenList = ({ data }) => {
  console.log("aaa hi gya data", data);
  const [bbb, setBBewq] = useState(data);

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
        {bbb?.map((item) => (
          <tbody>
            <tr>
              <td>{item.name}</td>
              <td>{item.symbol}</td>
              <td>{item.item}</td>
              <td>{item.totalSupply}</td>
            </tr>
          </tbody>
        ))}
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
