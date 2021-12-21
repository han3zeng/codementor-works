import React, { memo } from 'react';
import styled from 'styled-components';
import { SAVE_ARTICLE, UNSAVE_ARTICLE } from '../constants';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 30px 0;
  border-bottom: 1px solid ${(props) => props.theme.formGray};
  .resultRowleft {
    > div {
      display: flex;
      align-items: center;
      > p {
        color: #404040;
        margin-right: 10px;
        background-color: #F0F0F0;
        padding: 3px 6px;
      }
      > p:first-of-type {
        margin-right: 30px;
        background-color: transparent;
      }
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
  color: ${(props) => (props.highlight ? 'white' : props.theme.formHighlightGray)};
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
  const categoriesContent = categories.map((category) => <p>{category}</p>)
  return (
    <Container
      saved={saved}
    >
      <div
        className="resultRowleft"
      >
        <h2>
          {title}
        </h2>
        <div>
          <p>{authorName}</p>
          {categoriesContent}
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
