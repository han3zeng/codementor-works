import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1440px;
  padding: 20px;
  margin: 0 auto;
`;

function Layout() {
  return (
    <Container>
      <Outlet />
    </Container>
  );
}

export default Layout;
