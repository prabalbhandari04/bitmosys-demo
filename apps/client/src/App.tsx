import React from "react";
import { Stack } from "@fluentui/react";
import { Header } from "./components/Header";
import {TableSort} from "./components/Table";
import { ButtonBooking } from "./components/Button";
import { PnsDrawer } from "./components/pnsDrawer";
function App() {
  return (
    <>
        <Stack>
      <Header />
      <Stack>
      <ButtonBooking />
      </Stack>
      <TableSort />
    </Stack>
    </>
  );
}

export default App;
