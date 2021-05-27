import React from 'react';
import styled from 'styled-components';

const InputArea = styled.input``;
const Button = styled.button``;
function ChattingInput({ onSubmit }) {
  return (
    <>
      <form onSubmit={onSubmit}>
        <InputArea></InputArea>
        <Button>전송</Button>
      </form>
    </>
  );
}

export default ChattingInput;
