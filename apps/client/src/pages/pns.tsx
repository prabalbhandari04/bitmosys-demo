import React, { useState } from "react";
import { Stack } from "@fluentui/react";

import { CreateBooking } from "../components/createBooking";
import { TableSortPns } from "../components/TablePns";
// import { ServiceCard } from "../components/ServiceCard";
export const Pns = () => {
    return (
        <Stack>
             <h1>product and services page</h1>
             <Stack>
             <TableSortPns />
             </Stack>
             <Stack>
                {/* <ServiceCard serviceCode={128} serviceName={Test}/> */}
             </Stack>
        </Stack>
    )
}