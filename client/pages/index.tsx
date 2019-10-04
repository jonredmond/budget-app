import React, { SFC, Fragment } from 'react';
import Head from 'next/head';

import { Header, Table } from '../components';

const IndexPage: SFC<{}> = () => (
  <Fragment>
    <Header username="Username" />
    <Table />
  </Fragment>
);

export default IndexPage;
