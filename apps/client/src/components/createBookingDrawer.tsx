import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Button, OverlayDrawer, DrawerBody, DrawerHeader, DrawerHeaderTitle } from "@fluentui/react-components";
import { Dismiss24Regular } from "@fluentui/react-icons";
import { fetchRates } from '../redux/rateSlice';
import { createBooking } from '../redux/bookingSlice';

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
  padding-right: 30px;
`;

export const CreateBookingDrawer = () => {
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [formData, setFormData] = useState({
    serviceCode: '',
    serviceName: '',
    serviceType: '',
    rate: '',
    vat: ''
  });

  const rates = useSelector((state) => state.rates.rates);
  const status = useSelector((state) => state.rates.status);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRates());
  }, [dispatch]);

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
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setInputValue(option.name);
    setIsOpen(false);
  };

  const resetInput = () => {
    setInputValue('');
    setSelectedOption(null);
  };

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    if (selectedOption && startTime && endTime) {
      console.log(selectedOption.id)
      const bookingData = {
        userId: 4,
        rateId: selectedOption.id,
        startDatetime: startTime,
        endDatetime: endTime
      };

      dispatch(createBooking(bookingData));

      setInputValue('');
      setSelectedOption(null);
      setStartTime('');
      setEndTime('');
    } else {
      console.log('Please select a service and provide start and end time.');
    }
  };

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };

  const filteredOptions = rates.filter(option => option.name.toLowerCase().includes(inputValue.toLowerCase()));

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
              style={{ paddingRight: '30px', width: '500px' }}
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
                  color: 'black'
                }} 
              >
                &#10005;
              </button>
            )}
            {isOpen && (
              <DropdownContent style={{ width: '100%', marginTop: '5px' }}>
                {filteredOptions.length > 0 ? (
                  <>
                    <DropdownOption onClick={handleCreatePNSClick} style={{ fontWeight: 'bold' }}>
                      Create New Product & Services
                    </DropdownOption>
                    {filteredOptions.map((option, index) => (
                      <DropdownOption key={index} onClick={() => handleOptionClick(option)}>
                        {`${option.id} - ${option.pns.serviceCode} - ${option.pns.serviceName} - ${option.name} - ${option.hourlyRate}`}
                      </DropdownOption>
                    ))}
                  </>
                ) : (
                  <DropdownOption onClick={handleCreatePNSClick} style={{ fontWeight: 'bold' }}>
                    Create New Product & Services
                  </DropdownOption>
                )}
              </DropdownContent>
            )}
          </div>
        </div>
        <div>
          <form onSubmit={handleSubmitBooking} style={{ display: 'flex', flexDirection: 'column' , marginTop: '20px' }}>
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
            <button type="submit" style={{ marginTop: '10px' }}>Submit</button>
          </form>
        </div>
      </div>

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
          <FormContainer>
            <form onSubmit={handleSubmitBooking} style={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
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
                    onChange={handleInputChangePNS}
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
          </FormContainer>
        </DrawerBody>
      </OverlayDrawer>
    </div>
  );
};
