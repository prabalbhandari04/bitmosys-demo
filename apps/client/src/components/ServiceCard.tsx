// import * as React from "react";
// import { Card, CardSection, CardHeader, CardPreview, Button } from "@fluentui/react-components";
// import { ArrowReplyRegular, ShareRegular } from "@fluentui/react-icons";
// import { makeStyles, shorthands } from "@fluentui/react-components";
// import { DetailsList, DetailsListLayoutMode, IColumn } from "@fluentui/react-components";

// const useStyles = makeStyles({
//   card: {
//     ...shorthands.margin("auto"),
//     width: "720px",
//     maxWidth: "100%",
//   },
// });

// const columns: IColumn[] = [
//   { key: 'column1', name: 'Rate', fieldName: 'rate', minWidth: 100 },
//   { key: 'column2', name: 'VAT', fieldName: 'vat', minWidth: 100 },
// ];

// const data = [
//   { key: '1', rate: '$10', vat: '5%' },
//   { key: '2', rate: '$20', vat: '10%' },
//   { key: '3', rate: '$15', vat: '8%' },
// ];

// const ServiceCard = ({ serviceCode, serviceName }) => {
//   const styles = useStyles();

//   return (
//     <Card className={styles.card}>
//       <CardHeader
//         header={<React.Fragment><b>Service Code:</b> {serviceCode}</React.Fragment>}
//         description={<React.Fragment><b>Service Name:</b> {serviceName}</React.Fragment>}
//       />
//       <Card.Section>
//         <CardPreview>
//           <DetailsList
//             items={data}
//             columns={columns}
//             layoutMode={DetailsListLayoutMode.justified}
//           />
//         </CardPreview>
//       </Card.Section>
//       <Card.Section>
//         <CardFooter>
//           <Button icon={<ArrowReplyRegular fontSize={16} />}>Reply</Button>
//           <Button icon={<ShareRegular fontSize={16} />}>Share</Button>
//         </CardFooter>
//       </Card.Section>
//     </Card>
//   );
// };

// export default ServiceCard;
