/* eslint-disable react/prop-types */
import { Box } from '@chakra-ui/layout';
import { useRadio } from '@chakra-ui/radio';
import React from 'react';

function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  const currentRegion = props.regions[props.index];

  const setIt = () => {
    if (
      currentRegion.checked &&
      props.currentRegion.name !== currentRegion.name
    ) {
      props.setCurrentRegion(currentRegion);
    }
  };

  return (
    <Box as="label" m={1}>
      <input
        {...input}
        checked={props.regions[props.index].checked}
        onChange={() => {
          const newRadios = props.regions;
          newRadios.map(radio => (radio.checked = false));
          newRadios[props.index].checked = true;
          props.setRegions(newRadios);
          setIt();
        }}
      />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        color="white"
        bg={props.color}
        _checked={{
          bg: props.color,
          color: 'white',
          borderWidth: '3px',
          borderColor: 'red.500',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
}

export default RadioCard;
