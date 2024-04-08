import * as React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  makeStyles,
  Body1,
  Caption1,
  Button,
  shorthands,
} from "@fluentui/react-components";
import { ArrowReplyRegular, ShareRegular } from "@fluentui/react-icons";
import {
  Card,
  CardFooter,
  CardHeader,
  CardPreview,
} from "@fluentui/react-components";
import { fetchRates, createRate } from "../redux/rateSlice";

// Import table components
import {
  FolderRegular,
  EditRegular,
  OpenRegular,
  DocumentRegular,
  PeopleRegular,
  DocumentPdfRegular,
  VideoRegular,
  Avatar,
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableCellLayout,
} from "@fluentui/react-components";

interface Rate {
  id: number;
  name: string;
  hourlyRate: number;
  vat: number;
  status: number;
  pns: {
    id: number;
    serviceCode: string;
    serviceName: string;
    status: number;
  };
}

const useStyles = makeStyles({
  card: {
    ...shorthands.margin("auto"),
    width: "720px",
    maxWidth: "100%",
    marginTop : "20px;",
    marginBottom: "20px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", 
  },
});

export const ServiceCard = () => {
  const styles = useStyles();
  const [groupedRates, setGroupedRates] = useState<Rate[][]>([]);
  const rates = useSelector((state) => state.rates.rates);
  const status = useSelector((state) => state.rates.status);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRates());
  }, [dispatch]);

  useEffect(() => {
    // Group rates by service code and name
    const grouped = {};
    rates.forEach((rate) => {
      const key = `${rate.pns.serviceCode}-${rate.pns.serviceName}`;
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(rate);
    });
    setGroupedRates(Object.values(grouped));
  }, [rates]);

  return (
    <div>
      {groupedRates.map((group, index) => (
        <Card key={index} className={styles.card}>
          {group.map((rate: Rate, index: number) => (
            <React.Fragment key={index}>
              {index === 0 && (
                <CardHeader
                  header={<b>Service Code : {rate.pns.serviceCode}</b>}
                  description={<Caption1>Service Name : {rate.pns.serviceName}</Caption1>}
                />
              )}
              <Table size="extra-small" aria-label="Table with extra-small size">
                {index === 0 && (
                  <TableHeader>
                    <TableRow>
                      <TableHeaderCell>Name</TableHeaderCell>
                      <TableHeaderCell>Hourly Rate</TableHeaderCell>
                      <TableHeaderCell>Vat %</TableHeaderCell>
                    </TableRow>
                  </TableHeader>
                )}
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <TableCellLayout>{rate.name}</TableCellLayout>
                    </TableCell>
                    <TableCell>{rate.hourlyRate}</TableCell>
                    <TableCell>{rate.vat}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </React.Fragment>
          ))}
        </Card>
      ))}
    </div>
  );
};
