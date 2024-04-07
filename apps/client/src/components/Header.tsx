import * as React from "react";
import {
  Image,
  Link,
  SearchBox,
  Stack,
  Text,
} from "@fluentui/react";
import framelogo from "../assets/Framelogo.svg";

export const Header: React.FunctionComponent = () => {
  return (
    <Stack
      disableShrink
      horizontal
      verticalAlign="center"
      horizontalAlign="space-between"
      styles={{
        root: {
          backgroundColor: "#000000", 
          height: "50px",
          maxHeight: "49px",
          position: "fixed", 
          top: 0, 
          left: 0, 
          width: "100%", 
          zIndex: 1000, 
        },
      }}
    >
      <Stack.Item grow={1} styles={{ root: { minWidth: 0 } }}>
        <Link href="http://localhost:5173">
          <Stack horizontal wrap={false} verticalAlign="center">
            <Image src={framelogo} alt="product logo" />
            <Text
              key="productName"
              variant={"large"}
              styles={{
                root: {
                  color: "white",
                },
              }}
            >
              BITMOSYS_DEMO
            </Text>
          </Stack>
        </Link>
      </Stack.Item>
      <Stack.Item grow={3} styles={{ root: { textAlign: "right" } }}>
        <Stack
          horizontal
          verticalAlign="center"
          tokens={{ childrenGap: 10 }}
          styles={{ root: { minWidth: 0 } }}
        >
          <Stack.Item>
            <SearchBox
              placeholder="Search"
              onSearch={(newValue) => console.log("value is " + newValue)}
            />
          </Stack.Item>
        </Stack>
      </Stack.Item>
    </Stack>
  );
};
