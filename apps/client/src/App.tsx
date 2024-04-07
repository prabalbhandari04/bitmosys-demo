import React, { useEffect } from "react";
import { Stack } from "@fluentui/react";
import { Header } from "./components/Header";
import { TableSort } from "./components/Table";
import { ButtonBooking } from "./components/Button";

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
