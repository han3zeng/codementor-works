import React, { memo } from 'react';
import styled from 'styled-components';
import { SAVE_ARTICLE, UNSAVE_ARTICLE } from '../constants';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left {
    > div {
      display: flex;
    }
  }
  button {
    display: ${(props) => (props.saved ? 'initial' : 'none')};
  }
  &:hover {
    button {
      display: initial;
    }
  }
`;

const Button = styled.button`
  background-color: ${(props) => (props.highlight ? props.theme.formGray : 'white')};
  color: ${(props) => (props.highlight ? 'white' : '#333')};
`;

function ResultRow({
  title,
  categories,
  authorName,
  id,
  onSaveToggleHandler,
  saved,
}) {
  if (!id) {
    return null;
  }
  return (
    <Container
      saved={saved}
    >
      <div
        className="left"
      >
        <h2>
          {title}
        </h2>
        <div>
          <p>{authorName}</p>
          <p>{categories}</p>
        </div>
      </div>
      <Button
        highlight={saved}
        type="button"
        onClick={() => {
          onSaveToggleHandler({
            type: saved ? UNSAVE_ARTICLE : SAVE_ARTICLE,
            payload: {
              title,
              categories,
              authorName,
              id,
            },
          });
        }}
      >
        {saved ? 'unsave' : 'save'}
      </Button>
    </Container>
  );
}

export default memo(ResultRow);
