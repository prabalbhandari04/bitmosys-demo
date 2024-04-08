import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  useTableFeatures,
  useTableSort,
  TableColumnDefinition,
  createTableColumn,
} from "@fluentui/react-components";
import { fetchBookings } from '../redux/bookingSlice';

type Booking = {
  BookingId: number;
  StartDatetime: string;
  EndDatetime: string;
  ServiceCode: string; // New column: service code
  ServiceName: string; // New column: service name
  ServiceType: string; // New column: service type
};

export const TableSort: React.FC = () => {
  const dispatch = useDispatch();
  const bookings = useSelector((state: any) => state.bookings.bookings);
  const [sortedBookings, setSortedBookings] = useState<Booking[]>([]);
  const [sortState, setSortState] = useState<{
    sortDirection: "ascending" | "descending";
    sortColumn: string | undefined;
  }>({
    sortDirection: "ascending",
    sortColumn: "StartDatetime",
  });

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  useEffect(() => {
    setSortedBookings(bookings);
  }, [bookings]);

  const columns: TableColumnDefinition<Booking>[] = [
    createTableColumn<Booking>({
      columnId: "StartDatetime",
      header: "Start Datetime",
      cell: (item) => new Date(item.StartDatetime).toLocaleString(),
      compare: (a, b) => new Date(a.StartDatetime).getTime() - new Date(b.StartDatetime).getTime(),
    }),
    createTableColumn<Booking>({
      columnId: "EndDatetime",
      header: "End Datetime",
      cell: (item) => new Date(item.EndDatetime).toLocaleString(),
      compare: (a, b) => new Date(a.EndDatetime).getTime() - new Date(b.EndDatetime).getTime(),
    }),
    createTableColumn<Booking>({
      columnId: "ServiceCode", // New column: service code
      header: "Service Code",
      cell: (item) => item.ServiceCode,
      compare: (a, b) => a.ServiceCode.localeCompare(b.ServiceCode),
    }),
    createTableColumn<Booking>({
      columnId: "ServiceName", // New column: service name
      header: "Service Name",
      cell: (item) => item.ServiceName,
      compare: (a, b) => a.ServiceName.localeCompare(b.ServiceName),
    }),
    createTableColumn<Booking>({
      columnId: "ServiceType", // New column: service type
      header: "Service Type",
      cell: (item) => item.ServiceType,
      compare: (a, b) => a.ServiceType.localeCompare(b.ServiceType),
    }),
  ];

  const {
    getRows,
    sort: { getSortDirection, toggleColumnSort },
  } = useTableFeatures(
    {
      columns,
      items: sortedBookings,
    },
    [
      useTableSort({
        sortState,
        onSortChange: (_, nextSortState) => setSortState(nextSortState),
      }),
    ]
  );

  const headerSortProps = (columnId: string) => ({
    onClick: (e: React.MouseEvent) => toggleColumnSort(e, columnId),
    sortDirection: getSortDirection(columnId),
  });

  return (
    <Table sortable aria-label="Sortable table">
      <TableHeader>
        <TableRow>
        <TableHeaderCell {...headerSortProps("ServiceName")}>Service Name</TableHeaderCell>
          <TableHeaderCell {...headerSortProps("ServiceType")}>Service Hourly Rate</TableHeaderCell>
          <TableHeaderCell {...headerSortProps("StartDatetime")}>Start Datetime</TableHeaderCell>
          <TableHeaderCell {...headerSortProps("EndDatetime")}>End Datetime</TableHeaderCell>
        </TableRow>
      </TableHeader>
      {sortedBookings.map((booking, index) => (
        <TableRow key={index}>
          <TableCell>{booking.Rate.name}</TableCell>
          <TableCell>{booking.Rate.hourlyRate}</TableCell>
          <TableCell>{new Date(booking.StartDatetime).toLocaleString()}</TableCell>
          <TableCell>{new Date(booking.EndDatetime).toLocaleString()}</TableCell>
         </TableRow>
      ))}
    </Table>
  );
};
