import React, { useState } from 'react';
import styled from 'styled-components';
import {
  makeStyles,
  Button,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  OverlayDrawer,
} from "@fluentui/react-components";
import {
  bundleIcon,
  CalendarMonthFilled,
  CalendarMonthRegular,
  Dismiss24Regular,
} from "@fluentui/react-icons";
import { TableSortPNS } from './TablePNS';


const useStyles = makeStyles({
  wrapper: {
    columnGap: "15px",
    display: "flex",
  },
  button: {
    width: "100%",
    transitionProperty: "background-color, color",
    transitionDuration: "0.3s",
    "&:hover": {
      backgroundColor: "black",
      color: "white",
    },
  },
});

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

export const CreateBookingForm = () => {
  const options = [
    {
      id: 6,
      hourlyRate: 50,
      vat: 2,
      status: 0,
      pns: {
        id: 6,
        serviceCode: 126,
        serviceName: 'Dental Nurse',
        type: 'Emergency Weekend',
        status: 1
      }
    },
    {
      id: 5,
      hourlyRate: 50,
      vat: 2,
      status: 0,
      pns: {
        id: 7,
        serviceCode: 127,
        serviceName: 'Dental Assistant',
        type: 'Emergency Weekend',
        status: 0
      }
    },
    {
      id: 4,
      hourlyRate: 50,
      vat: 2,
      status: 0,
      pns: {
        id: 8,
        serviceCode: 128,
        serviceName: 'Dentist',
        type: 'Emergency Weekend',
        status: 0
      }
    },
    {
      id: 1,
      hourlyRate: 2,
      vat: 128,
      status: 0,
      pns: {
        id: 8,
        serviceCode: 128,
        serviceName: 'Receptionist',
        type: 'Emergency Weekend',
        status: 0
      }
    }
  ];

  const styles = useStyles();
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [formData, setFormData] = useState({
    serviceCode: selectedOption ? selectedOption.pns.serviceCode : '',
    serviceName: selectedOption ? selectedOption.pns.serviceName : '',
    serviceType: selectedOption ? selectedOption.pns.type : '',
    rate: selectedOption ? selectedOption.hourlyRate : '',
    vat: selectedOption ? selectedOption.vat : ''
  });

  const handleInputChangePNS = (event) => {
    const { id, value } = event.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleCreatePNSClick = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    const filtered = options.filter(
      (option) =>
        option.pns.serviceName.toLowerCase().includes(value.toLowerCase()) ||
        option.pns.serviceCode.toString().includes(value)
    );
    setFilteredOptions(filtered);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setInputValue(option.pns.serviceName);
    setIsOpen(false);
  };

  const resetInput = () => {
    setInputValue('');
    setSelectedOption(null);
    setFilteredOptions(options);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedOption) {
      console.log('Start Time:', startTime);
      console.log('End Time:', endTime);
      console.log('Selected Service:', selectedOption);
    } else {
      console.log('Please select a service.');
    }
  };

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };

  return (
    <div>
        <div>
  <h3>Select One Product & Services :</h3>
  <div className="dropdown-filter">
    <div className="dropdown" style={{ position: 'relative', width: '100%' }}>
      <TextField
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        style={{ paddingRight: '30px', width: '500px' }} // Adjust padding to accommodate the cross
      />
      {inputValue && (
        <button
          className="reset-button"
          onClick={resetInput}
          style={{ 
            position: 'absolute', 
            right: '5px', 
            top: '50%', 
            transform: 'translateY(-50%)',
            color: 'black' // Change cross button color to black
          }} 
        >
          &#10005;
        </button>
      )}
      {isOpen && (
        <DropdownContent style={{ width: '100%', marginTop: '5px' }}>
          <Button
            className={styles.button}
            appearance="transparent"
            onClick={handleCreatePNSClick}
          >
            Create New Product & Services
          </Button>
          {filteredOptions.map((option, index) => (
            <DropdownOption
              key={index}
              onClick={() => handleOptionClick(option)}
            >
              {`${option.pns.serviceCode} - ${option.pns.serviceName} - ${option.pns.type} - ${option.hourlyRate}`}
            </DropdownOption>
          ))}
        </DropdownContent>
      )}
    </div>
  </div>
</div>



<form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' , marginTop: '20px' }}>
  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
    <div style={{ marginRight: '10px' }}>
      <Label htmlFor="startTime">Start Time (Date and Time):</Label>
      <Input
        type="datetime-local"
        id="startTime"
        value={startTime}
        onChange={handleStartTimeChange}
      />
    </div>
    <div>
      <Label htmlFor="endTime">End Time (Date and Time):</Label>
      <Input
        type="datetime-local"
        id="endTime"
        value={endTime}
        onChange={handleEndTimeChange}
      />
    </div>
  </div>

  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '10px' }}>
    <div style={{ marginRight: '10px' }}>
      <Label htmlFor="serviceCode">Service Code:</Label>
      <Input
        type="text"
        id="serviceCode"
        value={selectedOption ? selectedOption.pns.serviceCode : ''}
        readOnly
      />
    </div>
    <div>
      <Label htmlFor="serviceName">Service Name:</Label>
      <Input
        type="text"
        id="serviceName"
        value={selectedOption ? selectedOption.pns.serviceName : ''}
        readOnly
      />
    </div>
  </div>
          
  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '10px' }}>
    <div style={{ marginRight: '10px' }}>
      <Label htmlFor="serviceType">Service Type:</Label>
      <Input
        type="text"
        id="serviceType"
        value={selectedOption ? selectedOption.pns.type : ''}
        readOnly
      />
    </div>
    <div style={{ marginLeft: '10px' }}>
      <Label htmlFor="rate">Rate:</Label>
      <Input
        type="number"
        id="rate"
        value={selectedOption ? selectedOption.hourlyRate : ''}
        readOnly
      />
    </div>
  </div>

  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '10px' }}>
    <div style={{ marginRight: '10px' }}>
      <Label htmlFor="vat">VAT:</Label>
      <Input
        type="text"
        id="vat"
        value={selectedOption ? selectedOption.vat : ''}
        readOnly
      />
    </div>
  </div>

  <button type="submit" style={{ marginTop: '10px' }}>Submit</button>
</form>



      <OverlayDrawer
        modalType="non-modal"
        open={isDrawerOpen}
        onOpenChange={(event, { open }) => setIsDrawerOpen(open)}
        position="end"
        style={{ width: "600px" }}
      >
        <DrawerHeader>
          <DrawerHeaderTitle
            action={
              <Button
                appearance="subtle"
                aria-label="Close"
                icon={<Dismiss24Regular />}
                onClick={handleCloseDrawer}
              />
            }
          >
            Create New Product & Services
          </DrawerHeaderTitle>
        </DrawerHeader>
       
        <DrawerBody>
            
            
          <TableSortPNS />


          <div>
  <h3>Select user :</h3>
  <div className="dropdown-filter">
    <div className="dropdown" style={{ position: 'relative', width: '100%' }}>
      <TextField
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        style={{ paddingRight: '30px', width: '500px' }} // Adjust padding to accommodate the cross
      />
      {inputValue && (
        <button
          className="reset-button"
          onClick={resetInput}
          style={{ 
            position: 'absolute', 
            right: '5px', 
            top: '50%', 
            transform: 'translateY(-50%)',
            color: 'black' // Change cross button color to black
          }} 
        >
          &#10005;
        </button>
      )}
      {isOpen && (
        <DropdownContent style={{ width: '100%', marginTop: '5px' }}>
          {filteredOptions.map((option, index) => (
            <DropdownOption
              key={index}
              onClick={() => handleOptionClick(option)}
            >
              {`${option.pns.serviceCode} - ${option.pns.serviceName} - ${option.pns.type} - ${option.hourlyRate}`}
            </DropdownOption>
          ))}
        </DropdownContent>
      )}
    </div>
  </div>
</div>


<div>
<form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '10px' }}>
        <div style={{ marginRight: '10px' }}>
          <Label htmlFor="serviceCode">Service Code:</Label>
          <Input
            type="text"
            id="serviceCode"
            value={formData.serviceCode}
            onChange={handleInputChangePNS}
          />
        </div>
        <div>
          <Label htmlFor="serviceName">Service Name:</Label>
          <Input
            type="text"
            id="serviceName"
            value={formData.serviceName}
            onChange={handleInputChange}
          />
        </div>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '10px' }}>
        <div style={{ marginRight: '10px' }}>
          <Label htmlFor="serviceType">Service Type:</Label>
          <Input
            type="text"
            id="serviceType"
            value={formData.serviceType}
            onChange={handleInputChangePNS}
          />
        </div>
        <div style={{ marginLeft: '10px' }}>
          <Label htmlFor="rate">Rate:</Label>
          <Input
            type="number"
            id="rate"
            value={formData.rate}
            onChange={handleInputChangePNS}
          />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '10px' }}>
        <div style={{ marginRight: '10px' }}>
          <Label htmlFor="vat">VAT:</Label>
          <Input
            type="text"
            id="vat"
            value={formData.vat}
            onChange={handleInputChangePNS}
          />
        </div>
      </div>

      <button type="submit" style={{ marginTop: '10px' }}>Submit</button>
    </form>
</div>

        </DrawerBody>
      </OverlayDrawer>
    </div>
  );
};
