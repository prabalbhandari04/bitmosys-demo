import React, { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
`;

const Label = styled.label`
  margin-bottom: 5px;
  text-align: left;
`;

const Input = styled.input`
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
`;

const DropdownContent = styled.div`
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const DropdownOption = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const TextField = styled.input`
  padding-right: 30px; /* Add space for the cross button */
`;

export const CreatePNSForm = () => {
  return (
    <FormContainer>
        <div>Product Page</div>
    </FormContainer>
  );
};