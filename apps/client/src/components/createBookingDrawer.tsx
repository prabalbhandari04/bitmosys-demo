import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Button, OverlayDrawer, DrawerBody, DrawerHeader, DrawerHeaderTitle } from "@fluentui/react-components";
import { Dismiss24Regular } from "@fluentui/react-icons";
import { fetchRates, createRate } from '../redux/rateSlice';
import { createBooking } from '../redux/bookingSlice';
import { fetchPns, createPns } from '../redux/pnsSlice';

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

const TextField = styled.input`
  padding-right: 30px;
`;

export const CreateBookingDrawer = ({onClose}) => {
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

  useEffect(() => {
    if (status === 'succeeded') {
      // Close drawer after successful creation
      // Update dropdown and select the recently created product and service
      const newlyCreatedOption = rates.find(option => option.name === formData.serviceType);
      if (newlyCreatedOption) {
        setSelectedOption(newlyCreatedOption);
        setInputValue(newlyCreatedOption.name);
      }
    }
  }, [status, rates, formData.serviceType, dispatch]);

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
      const bookingData = {
        userId: 1,
        rateId: selectedOption.id,
        startDatetime: startTime,
        endDatetime: endTime
      };
  
      dispatch(createBooking(bookingData));
      alert("Booking Created Successfully.");
      onClose();
      setInputValue('');
      setSelectedOption(null);
      setStartTime('');
      setEndTime('');
    } else {
      console.log('Please select a service and provide start and end time.');
    }
  };
  

  const handleSubmitPns = (e) => {
    e.preventDefault();

    // Check if required form data is available
    if (formData.serviceType && formData.rate && formData.vat) {
      const rateData = {
        pnsId: 1,
        name: formData.serviceType,
        hourlyRate: formData.rate,
        vat: formData.vat
      };
      const pnsData = {
        userId: 1,
        serviceCode: formData.serviceCode,
        serviceName: formData.serviceName
      }
      dispatch(createPns(pnsData));
      dispatch(createRate(rateData));
      alert("Product & Service Created Successfully.")
      setInputValue('');
      setIsDrawerOpen(false); // Close the drawer upon successful submission
    } else {
      console.log('Please fill in all required fields.');
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
              <div style={{ width: '100%', marginTop: '5px' }}>
                {filteredOptions.length > 0 ? (
                  <>
                    <div onClick={handleCreatePNSClick} style={{ fontWeight: 'bold' }}>
                      Create New Product & Services
                    </div>
                    {filteredOptions.map((option, index) => (
                      <div key={index} onClick={() => handleOptionClick(option)}>
                        {`${option.id} - ${option.pns.serviceCode} - ${option.pns.serviceName} - ${option.name} - ${option.hourlyRate}`}
                      </div>
                    ))}
                  </>
                ) : (
                  <div onClick={handleCreatePNSClick} style={{ fontWeight: 'bold' }}>
                    Create New Product & Services
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div>
          <form onSubmit={handleSubmitBooking} style={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
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
        onOpenChange={(event, { open }) => {
          if (!open) {
            // Reset form data before closing the drawer
            setFormData({
              serviceCode: '',
              serviceName: '',
              serviceType: '',
              rate: '',
              vat: ''
            });
          }
          setIsDrawerOpen(open);
        }}
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
                onClick={() => setIsDrawerOpen(false)}
              />
            }
          >
            Create New Product & Services
          </DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody>
          <FormContainer>
            <form onSubmit={handleSubmitPns} style={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
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
