import React from "react";
import { Stack } from "@fluentui/react";

import { CreateBooking } from "../components/createBooking";
import { TableSortPns } from "../components/TablePns";
import { ServiceCard } from "../components/ServiceCard";
import { CreateNewPns } from "../components/createPNS";

export const Pns = () => {
    return (
        <Stack style={{ marginTop: "50px" }}>
            <CreateNewPns/>
            <ServiceCard/>
        </Stack>
    )
}
