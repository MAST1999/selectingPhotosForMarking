import { Button, Center, Flex, Heading, HStack, Spacer } from '@chakra-ui/react';
import React from 'react'

function Header() {
  return (
    <Flex>
      <Center>
        <Heading ml="4px" size="md">
          Photo Marking App
        </Heading>
      </Center>
      <Spacer />
      <HStack spacing="24px" p="4px" mt="4px">
        <Button colorScheme="blue">Load Photos</Button>
        <Button colorScheme="green">Instructions</Button>
      </HStack>
    </Flex>
  );
}

export default Header
