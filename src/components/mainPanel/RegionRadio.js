import React from 'react';
import PropTypes from 'prop-types';
import { useRadioGroup } from '@chakra-ui/radio';
import { Flex } from '@chakra-ui/layout';
import RadioCard from '../view/RadioCard';

function RegionRadio({ regions, setCurrentRegion, setRegions, currentRegion }) {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'regions',
    onChange: console.log,
  });

  const group = getRootProps();

  return (
    <Flex {...group}>
      {regions.map((value, index) => {
        const radio = getRadioProps({ value: value.name });
        return (
          <RadioCard
            setRegions={setRegions}
            regions={regions}
            color={value.color}
            key={value.name}
            {...radio}
            index={index}
            setCurrentRegion={setCurrentRegion}
            currentRegion={currentRegion}
          >
            {value.name}
          </RadioCard>
        );
      })}
    </Flex>
  );
}

export default RegionRadio;

RegionRadio.propTypes = {
  regions: PropTypes.array,
  setCurrentRegion: PropTypes.func,
  setRegions: PropTypes.func,
  currentRegion: PropTypes.object,
};
