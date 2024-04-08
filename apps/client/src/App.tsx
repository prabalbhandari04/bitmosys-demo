import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Stack } from "@fluentui/react";
import { Header } from "./components/Header";
import { Booking } from "./pages/booking";
import { Pns } from "./pages/pns";

function App() {
  return (
    <Router>
      <Stack>
        <Header />
        <Stack>
          <Routes>
            <Route path="/" element={<Booking />} />
            <Route path="/product-and-services" element={<Pns />} />
          </Routes>
        </Stack>
      </Stack>
    </Router>
  );
}

export default App;
