import React from "react";

const Table = ({ data }) => (
  <table className="table table-dark table-striped">
    <thead>
      <tr>
        <th>#</th>
        <th>Tarih</th>
        <th>Enflasyon Endeksi</th>
        <th>Altın (Gram/TRY)</th>
        <th>USD/TRY</th>
      </tr>
    </thead>
    <tbody>
      {data.map((item, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{item.Date}</td>
          <td>{item.InflationIndex}</td>
          <td>{item.GoldPerGramTRY}</td>
          <td>{item.USDTRY}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default Table;