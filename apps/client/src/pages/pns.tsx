import React, { useState } from "react";
import { Stack } from "@fluentui/react";

import { CreateBooking } from "../components/createBooking";
import { TableSortPns } from "../components/TablePns";
import { ServiceCard } from "../components/ServiceCard";

export const Pns = () => {
    return (
        <Stack style={{ marginTop: "50px" }}>
            <ServiceCard/>
        </Stack>
    )
}
