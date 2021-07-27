import React, { useState } from 'react';
import {
  ChakraProvider,
  CSSReset,
  Divider,
  Grid,
  GridItem,
  theme,
} from '@chakra-ui/react';
import Navigation from './components/navigation/Navigation';
import './App.css';
import ImageCanvas from './components/mainPanel/ImageCanvas';
import LeftControls from './components/mainPanel/LeftControls';
import BottomTabs from './components/mainPanel/BottomTabs';

function App() {
  const [photo, setPhoto] = useState('');
  const [id, setId] = useState(null);
  const [currentRegion, setCurrentRegion] = useState({});
  const [allRegions, setAllRegions] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [coordsInfo, setCoordsInfo] = useState([]);

  return (
    <ChakraProvider theme={theme} h="100%">
      <CSSReset />
      <Grid
        overflowY="hidden"
        h="100vh"
        templateRows="45px 1fr 300px"
        templateColumns="1fr"
        gap={1}
        paddingTop={2}
        paddingX={1}
      >
        {/* Navigation */}
        <GridItem h={47}>
          <Navigation
            useRefresh={[refresh, setRefresh]}
            uploadInfo={{ coordsInfo, photo }}
            id={id}
            regionId={currentRegion.id}
          />
          <Divider orientation="horizontal" mt={2} />
        </GridItem>
        {/* Main Panel */}
        <GridItem>
          <Grid height="100%" templateRows="1fr" templateColumns="300px 1fr">
            <GridItem>
              <LeftControls
                setPhoto={setPhoto}
                refresh={refresh}
                setId={setId}
              />
            </GridItem>
            <GridItem>
              <ImageCanvas
                photo={photo}
                currentRegion={currentRegion}
                setCoordsInfo={setCoordsInfo}
                allRegions={allRegions}
                id={id}
              />
            </GridItem>
          </Grid>
        </GridItem>
        {/* Bottom Panel */}
        <GridItem>
          <BottomTabs
            setCurrentRegion={setCurrentRegion}
            currentRegion={currentRegion}
            setAllRegions={setAllRegions}
          />
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
}

export default App;
