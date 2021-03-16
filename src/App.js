import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {
  ChakraProvider,
  Flex,
  Grid,
  GridItem,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import PhotoNav from "./components/PhotoNav";
import Labels from "./components/Labels";
import MarkingComponent from "./components/MarkingComponent";

function App() {
  const [selectedPhoto, setSelectedPhoto] = useState("");
  const [label, setLabel] = useState({ name: "", color: "" });

  const newPhotoSelection = (photoAddress) => {
    setSelectedPhoto(photoAddress);
  };

  const newLabelSelection = (newLabelSelector) => {
    setLabel(newLabelSelector);
  };
  return (
    <div className="App">
      <ChakraProvider>
        <Grid
          templateColumns="5fr 14fr 1fr"
          templateRows="minmax(54px, 7%) 87% minmax(42px, 6%)"
          h="100vh"
        >
          {/* Header */}
          <GridItem
            bg="green.200"
            borderBottom="1px solid"
            borderColor="green.500"
            rowSpan={1}
            colSpan={3}
          >
            <Header />
          </GridItem>
          {/* The Left Navigation Part */}
          <GridItem colspan={1} rowStart={2} rowEnd={3}>
            <Flex direction="column" h="100%" overflow="auto">
              <Tabs mt="4px" ml="4px" isFitted variant="enclosed">
                <TabList>
                  <Tab>Select Photo</Tab>
                  <Tab>Labels</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <PhotoNav flex="1" setPhoto={newPhotoSelection} />
                  </TabPanel>
                  <TabPanel>
                    <Labels setTheLabel={newLabelSelection} />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Flex>
          </GridItem>
          {/* Marking Component */}
          <GridItem
            colStart={2}
            colEnd={4}
            rowStart={2}
            rowEnd={3}
            h="100%"
            overflow="auto"
          >
            <MarkingComponent photo={selectedPhoto} label={label} />
          </GridItem>
          {/* Footer */}
          <GridItem
            colStart={1}
            colEnd={4}
            rowStart={3}
            rowEnd={4}
            border="1px solid black"
          >
            <Footer />
          </GridItem>
        </Grid>
      </ChakraProvider>
    </div>
  );
}

export default App;
