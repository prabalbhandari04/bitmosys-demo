import * as React from "react";
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

type Service = {
  serviceName: string;
  type: string;
  startDatetime: Date;
  endDatetime: Date;
};

type Item = {
  service: Service;
};

const items: Item[] = [
  {
    service: {
      serviceName: "Meeting notes",
      type: "Document",
      startDatetime: new Date(),
      endDatetime: new Date(),
    },
  },
  {
    service: {
      serviceName: "Thursday presentation",
      type: "Folder",
      startDatetime: new Date(),
      endDatetime: new Date(),
    },
  },
  {
    service: {
      serviceName: "Training recording",
      type: "Video",
      startDatetime: new Date(),
      endDatetime: new Date(),
    },
  },
  {
    service: {
      serviceName: "Purchase order",
      type: "PDF Document",
      startDatetime: new Date(),
      endDatetime: new Date(),
    },
  },
];

const columns: TableColumnDefinition<Item>[] = [
  createTableColumn<Item>({
    columnId: "serviceName",
    compare: (a, b) => {
      return a.service.serviceName.localeCompare(b.service.serviceName);
    },
  }),
  createTableColumn<Item>({
    columnId: "type",
    compare: (a, b) => {
      return a.service.type.localeCompare(b.service.type);
    },
  }),
  createTableColumn<Item>({
    columnId: "startDatetime",
    compare: (a, b) => {
      return a.service.startDatetime.getTime() - b.service.startDatetime.getTime();
    },
  }),
  createTableColumn<Item>({
    columnId: "endDatetime",
    compare: (a, b) => {
      return a.service.endDatetime.getTime() - b.service.endDatetime.getTime();
    },
  }),
];

export const TableSort = () => {
  const [sortState, setSortState] = React.useState<{
    sortDirection: "ascending" | "descending";
    sortColumn: string | undefined;
  }>({
    sortDirection: "ascending",
    sortColumn: "serviceName",
  });

  const {
    getRows,
    sort: { getSortDirection, toggleColumnSort, sort },
  } = useTableFeatures(
    {
      columns,
      items,
    },
    [
      useTableSort({
        sortState,
        onSortChange: (e, nextSortState) => setSortState(nextSortState),
      }),
    ]
  );

  const headerSortProps = (columnId: string) => ({
    onClick: (e: React.MouseEvent) => toggleColumnSort(e, columnId),
    sortDirection: getSortDirection(columnId),
  });

  const rows = sort(getRows());

  return (
    <Table sortable aria-label="Sortable table">
      <TableHeader>
        <TableRow>
          <TableHeaderCell {...headerSortProps("serviceName")}>Service Name</TableHeaderCell>
          <TableHeaderCell {...headerSortProps("type")}>Type</TableHeaderCell>
          <TableHeaderCell {...headerSortProps("startDatetime")}>Start Datetime</TableHeaderCell>
          <TableHeaderCell {...headerSortProps("endDatetime")}>End Datetime</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(({ item }, index) => (
          <TableRow key={index}>
            <TableCell>{item.service.serviceName}</TableCell>
            <TableCell>{item.service.type}</TableCell>
            <TableCell>{item.service.startDatetime.toString()}</TableCell>
            <TableCell>{item.service.endDatetime.toString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
