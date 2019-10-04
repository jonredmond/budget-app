import React, { SFC, Fragment } from 'react';

import { primary } from '../../../styles/colors';

type TableHeaderProps = {};

const TableHeader: SFC<TableHeaderProps> = () => (
  <Fragment>
    <tr className="table-header">
      <th>Payee</th>
      <th>Amount</th>
      <th>Date</th>
    </tr>

    <style jsx>{`
      .table-header {
        background-color: ${primary};
      }
    `}</style>
  </Fragment>
);

export default TableHeader;
