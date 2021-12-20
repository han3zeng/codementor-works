import React, { memo } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  > div {
    display: flex;
  }
`;

function ResultRow({
  title,
  categories,
  authorName,
  id,
}) {
  return (
    <Container>
      <h2>
        {title}
      </h2>
      <div>
        <p>{authorName}</p>
        <p>{categories}</p>
      </div>
    </Container>
  );
}

export default memo(ResultRow);
