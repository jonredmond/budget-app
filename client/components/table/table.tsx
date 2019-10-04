import React, { SFC, Fragment } from 'react';

import TableHeader from './table-header/table-header';

type TableProps = {};

const Table: SFC<TableProps> = () => (
  <Fragment>
    <table className="table">
      <TableHeader />
    </table>
    <style jsx>{`
      .table {
        background-color: #fff;
        border-collapse: collapse;
        border: 1px solid black;
        color: #fff;
        margin: 0 auto;
      }
    `}</style>
  </Fragment>
);

export default Table;
