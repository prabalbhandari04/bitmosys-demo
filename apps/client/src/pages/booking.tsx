import React, { useState } from "react";
import { Stack } from "@fluentui/react";

import { CreateBooking } from "../components/createBooking";
import { TableSort } from "../components/Table";
export const Booking = () => {
    return (
        <div>
            <Stack>
            <CreateBooking />
            </Stack>
            <Stack>

            </Stack>

                    <TableSort />
        </div>
    )
}