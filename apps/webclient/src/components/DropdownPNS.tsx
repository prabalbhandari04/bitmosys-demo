import React, { useState } from 'react';
import styled from 'styled-components';

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

export const DropdownPNS = () => {
  const options = ['Apple', 'Banana', 'Orange', 'Pineapple', 'Grapes'];

  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    const filtered = options.filter(option =>
      option.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  const handleOptionClick = (option) => {
    setInputValue(option);
    setIsOpen(false);
  };

  const resetInput = () => {
    setInputValue('');
    setFilteredOptions(options);
  };

  return (
    <div className="dropdown-filter">
      <div className="dropdown">
        <TextField
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        />
        {isOpen && (
          <DropdownContent>
            {filteredOptions.map((option, index) => (
              <DropdownOption
                key={index}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </DropdownOption>
            ))}
          </DropdownContent>
        )}
        {inputValue && (
          <button className="reset-button" onClick={resetInput}>
            &#10005;
          </button>
        )}
      </div>
    </div>
  );
};
