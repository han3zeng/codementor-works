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
  .right {

  }
`;

const Button = styled.button`
  background-color: ${(props) => (props.highlight ? props.theme.formGray : 'white')};
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
    <Container>
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
      <div
        className="right"
      >
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
      </div>
    </Container>
  );
}

export default memo(ResultRow);
