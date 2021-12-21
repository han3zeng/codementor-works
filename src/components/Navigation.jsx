import React from 'react';
import styled from 'styled-components';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { paths } from '../config';
import { ArticlesProvider } from '../contexts/articles';
import Layout from './Layout';

const links = [
  paths.search,
  paths.favorite,
];

const LABEL_MAP = {
  search: 'Search',
  favorite: 'Favorite',
};

const Container = styled.div`
  background-color: #F0F0F0;
  height: 80px;
  display: flex;
  padding: 0 20px;
  align-items: flex-end;
`;

const Tab = styled.p`
  border-radius: 3px;
  width: 100px;
  height: 37px;
  padding-bottom: 10px;
  text-align: center;
  vertical-align: middle;
  display: inline-block;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin: 0;
  font-weight: ${(props) => (props.highlight ? 'bold' : 'initial')};
  color: ${(props) => (props.highlight ? 'black' : '#989898')};
  background-color: ${(props) => (props.highlight ? 'white' : 'transparent')};
`;

function Navigation() {
  const location = useLocation();
  const { pathname } = location;
  const tabs = links.map((tabName) => (
    <Link
      to={`/${tabName}`}
      key={tabName}
    >
      <Tab
        highlight={pathname === `/${tabName}`}
      >
        {LABEL_MAP[tabName]}
      </Tab>
    </Link>
  ));

  return (
    <>
      <Container>
        {tabs}
      </Container>
      <ArticlesProvider>
        <Layout>
          <Outlet />
        </Layout>
      </ArticlesProvider>
    </>
  );
}

export default Navigation;
