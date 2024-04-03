import React, { useState } from "react";
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
import { DropdownPNS } from "./DropdownPNS";
import { CreateBookingForm } from "./createBooking";
const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

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

export const ButtonBooking = () => {
  const styles = useStyles();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(""); // State to hold the selected dropdown option

  const handleCreateBookingClick = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleDropdownChange = (option) => {
    setSelectedOption(option.value); // Update selected option when dropdown value changes
  };

  return (
    <div className={styles.wrapper}>
      <Button
        className={styles.button}
        appearance="transparent"
        icon={<CalendarMonth />}
        onClick={handleCreateBookingClick}
      >
        Create New Booking
      </Button>
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
            Create New Booking
          </DrawerHeaderTitle>
        </DrawerHeader>
       
        <DrawerBody>
          <CreateBookingForm />
      </DrawerBody>
            
      </OverlayDrawer>
    </div>
  );
};
