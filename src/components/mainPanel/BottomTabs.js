import { TabList } from '@chakra-ui/tabs';
import { TabPanels } from '@chakra-ui/tabs';
import { TabPanel } from '@chakra-ui/tabs';
import { Tab } from '@chakra-ui/tabs';
import { Tabs } from '@chakra-ui/tabs';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  FormControl,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { HStack } from '@chakra-ui/layout';
import RegionRadio from './RegionRadio';
import { Button } from '@chakra-ui/button';

const randomColorGenerator = () => {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// eslint-disable-next-line no-unused-vars
function BottomTabs({ setCurrentRegion, currentRegion, setAllRegions }) {
  const [regions, setRegions] = useState(null);
  const [inputRegion, setInputRegion] = useState('');
  const [inputColor, setInputColor] = useState(randomColorGenerator());

  const getRegions = () => {
    axios.get('http://localhost:4000/api/regions/').then(res => {
      if (res.data) {
        setAllRegions(res.data);
        const defaultRegions = res.data.map(region => ({
          ...region,
          checked: false,
        }));
        setRegions(defaultRegions);
      }
    });
  };

  useEffect(() => {
    getRegions();
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    axios
      .post('http://localhost:4000/api/regions', {
        name: inputRegion,
        color: inputColor,
      })
      .then(() => getRegions())
      .catch(err => console.log(err));
  };

  return (
    <Tabs variant="enclosed">
      <TabList>
        <Tab>Region Attributes</Tab>
        <Tab>File Attributes</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <FormControl id="region" as="form" onSubmit={handleSubmit} action="">
            <FormLabel>Enter The new Region</FormLabel>
            <HStack>
              <Input
                type="text"
                w={200}
                onChange={event => setInputRegion(event.target.value)}
                value={inputRegion}
                required
              />
              <Input
                paddingX={0}
                type="color"
                width={20}
                value={inputColor}
                onChange={event => setInputColor(event.target.value)}
              />
              <Button colorScheme="blue" type="submit">
                Add
              </Button>
            </HStack>
            <FormHelperText>
              You can select another color if you want with the color selector
              at the end!
            </FormHelperText>
          </FormControl>
          {regions ? (
            <RegionRadio
              regions={regions}
              setRegions={setRegions}
              setCurrentRegion={setCurrentRegion}
              currentRegion={currentRegion}
            />
          ) : (
            <p>Enter some Regions first</p>
          )}
        </TabPanel>
        <TabPanel>
          <p>File Attributes will be here</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

BottomTabs.propTypes = {
  setCurrentRegion: PropTypes.func,
  currentRegion: PropTypes.object,
  setAllRegions: PropTypes.func,
};

export default BottomTabs;
