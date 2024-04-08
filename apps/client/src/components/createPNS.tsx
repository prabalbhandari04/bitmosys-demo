// CreateNewPns.js

import React, { useState } from 'react';
import { OverlayDrawer, makeStyles , DrawerBody, DrawerHeader, DrawerHeaderTitle, Button } from "@fluentui/react-components";
import { Dismiss24Regular } from "@fluentui/react-icons";
import { useDispatch } from 'react-redux';
import { createPns} from '../redux/pnsSlice';
import { createRate } from '../redux/rateSlice';
import styled from 'styled-components';

const useStyles = makeStyles({
  wrapper: {
    columnGap: "15px",
    display: "flex",
  },
  button: {
    marginTop: "60px",
    marginBottom: "30px",
    transitionProperty: "background-color, color",
    transitionDuration: "0.3s",
    "&:hover": {
      backgroundColor: "black",
      color: "white",
    },
  },
  ButtonBooking: {
    marginTop: "20px",
    marginBottom: "30px",
    marginLeft: "10px",
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

const TextField = styled.input`
  padding-right: 30px;
`;


export const CreateNewPns = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const styles = useStyles();

  const handleCreateNewProductClick = () => {
    setIsDrawerOpen(true);
  };

  const [formData, setFormData] = useState({
    serviceCode: '',
    serviceName: '',
    serviceType: '',
    rate: '',
    vat: ''
  });
  const dispatch = useDispatch();

  const handleInputChangePNS = (event) => {
    const { id, value } = event.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleSubmitPns = (e) => {
    e.preventDefault();

    // Check if required form data is available
    if (formData.serviceType && formData.rate && formData.vat) {
      const rateData = {
        pnsId: 11, // Assuming you have a static value for pnsId
        name: formData.serviceType,
        hourlyRate: formData.rate,
        vat: formData.vat
      };
      const pnsData = {
        userId: 3, // Assuming you have a static value for userId
        serviceCode: formData.serviceCode,
        serviceName: formData.serviceName
      }
      dispatch(createPns(pnsData));
      dispatch(createRate(rateData));
      setFormData({
        serviceCode: '',
        serviceName: '',
        serviceType: '',
        rate: '',
        vat: ''
      });
      setIsDrawerOpen(false); // Close the drawer upon successful submission
    } else {
      console.log('Please fill in all required fields.');
    }
  };

  return (
    <>
          <Button
        className={styles.button}
        onClick={() => setIsDrawerOpen(true)}
      >
        Create New Product & Services
      </Button>
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
                <label htmlFor="serviceCode">Service Code:</label>
                <input
                  type="text"
                  id="serviceCode"
                  value={formData.serviceCode}
                  onChange={handleInputChangePNS}
                />
              </div>
              <div>
                <label htmlFor="serviceName">Service Name:</label>
                <input
                  type="text"
                  id="serviceName"
                  value={formData.serviceName}
                  onChange={handleInputChangePNS}
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '10px' }}>
              <div style={{ marginRight: '10px' }}>
                <label htmlFor="serviceType">Service Type:</label>
                <input
                  type="text"
                  id="serviceType"
                  value={formData.serviceType}
                  onChange={handleInputChangePNS}
                />
              </div>
              <div style={{ marginLeft: '10px' }}>
                <label htmlFor="rate">Rate:</label>
                <input
                  type="number"
                  id="rate"
                  value={formData.rate}
                  onChange={handleInputChangePNS}
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '10px' }}>
              <div style={{ marginRight: '10px' }}>
                <label htmlFor="vat">VAT:</label>
                <input
                  type="text"
                  id="vat"
                  style={{ marginLeft: '10px' }}
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
    </>
  );
};

