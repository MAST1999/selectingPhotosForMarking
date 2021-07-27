/* eslint-disable no-unused-vars */
import { Button, IconButton } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  HamburgerIcon,
  RepeatIcon,
} from '@chakra-ui/icons';
import { Box, Flex, Grid, HStack } from '@chakra-ui/layout';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import PropTypes from 'prop-types';
import axios from 'axios';

function Navigation({ useRefresh, uploadInfo, id }) {
  const { register, handleSubmit } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [refresh, setRefresh] = useRefresh;

  const onSubmit = async data => {
    const formData = new FormData();
    let i = 0;
    for await (let picture of data.picture) {
      const reader = new FileReader();
      const img = new Image();

      img.addEventListener('load', async () => {
        formData.append(`width${i}`, img.width);
        formData.append(`height${i}`, img.height);
        // console.log(img.width, img.height, picture);
        formData.append(`picture${i}`, picture);
        formData.append(`name${i}`, picture.name);
        formData.append(`path${i}`, `http://localhost:4000/${picture.name}`);
        i++;

        if (i + 1 > data.picture.length) {
          const res = await fetch('http://localhost:4000/api/photos', {
            method: 'POST',
            body: formData,
          }).then(res => res.json());
          // console.log(res);

          onClose();
          setRefresh(!refresh);
        }
      });
      img.addEventListener('error', err => console.log(err));

      reader.addEventListener('load', () => {
        img.src = reader.result;
      });

      reader.readAsDataURL(picture);
      // console.log('should repeat 2 times');
    }
    // console.log('last');
  };

  const submitToServer = async () => {
    // console.log(id, uploadInfo);
    if (uploadInfo.coordsInfo.length === 0) return;
    const deleteRes = await axios.delete(
      `http://localhost:4000/api/photos/${id}/coords/delete`
    );
    // console.log(deleteRes);
    for await (let coord of uploadInfo.coordsInfo) {
      // console.log({
      //   firstcoord: coord.x,
      //   secondcoord: coord.y,
      //   width: coord.width,
      //   height: coord.height,
      //   regionId: coord.regionId,
      // });
      const res = await axios.post(
        `http://localhost:4000/api/photos/${id}/coords`,
        {
          firstcoord: coord.x,
          secondcoord: coord.y,
          width: coord.width,
          height: coord.height,
          regionId: coord.regionId,
        }
      );
      // console.log(res);
    }
  };

  return (
    <Grid templateRows="1fr" templateColumns="1fr 70px">
      <HStack spacing="18px">
        <Button colorScheme="blue">Home</Button>

        <Menu m="0px">
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            colorScheme="cyan"
          >
            Images
          </MenuButton>
          <MenuList>
            <MenuItem>
              <Box onClick={onOpen}>Upload Image</Box>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Modal Title</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <Box
                        as="input"
                        multiple
                        ref={register}
                        type="file"
                        name="picture"
                        maxW="100%"
                      />
                      <Button colorScheme="blue" type="submit" mt={3}>
                        Upload Photos
                      </Button>
                    </form>
                  </ModalBody>

                  <ModalFooter>
                    <Button variant="outline" mr={3} onClick={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </MenuItem>
          </MenuList>
        </Menu>

        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            colorScheme="cyan"
          >
            Annotation
          </MenuButton>
          <MenuList>
            <MenuItem>View Annotation</MenuItem>
          </MenuList>
        </Menu>

        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            colorScheme="cyan"
          >
            View
          </MenuButton>
          <MenuList>
            <MenuItem>Do Something</MenuItem>
          </MenuList>
        </Menu>

        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            colorScheme="cyan"
          >
            Help
          </MenuButton>
          <MenuList>
            <MenuItem>Getting Started</MenuItem>
          </MenuList>
        </Menu>

        <Flex w={135} direction="row" justifyContent="space-evenly">
          <IconButton
            variant="outline"
            colorScheme="blue"
            aria-label="Call Sage"
            fontSize="20px"
            icon={<ChevronLeftIcon />}
            title="Previous Photo"
          />
          <IconButton
            variant="outline"
            colorScheme="blue"
            aria-label="Call Sage"
            fontSize="20px"
            icon={<ChevronRightIcon />}
            title="Next Photo"
          />
          <IconButton
            variant="outline"
            colorScheme="blue"
            aria-label="Call Sage"
            fontSize="20px"
            icon={<HamburgerIcon />}
            title="Toggle List"
          />
        </Flex>

        <IconButton
          variant="outline"
          colorScheme="blue"
          aria-label="Call Sage"
          fontSize="20px"
          icon={<RepeatIcon />}
          title="Sync With The Server"
          onClick={submitToServer}
        />
      </HStack>
      <ColorModeSwitcher />
    </Grid>
  );
}

export default Navigation;

Navigation.propTypes = {
  useRefresh: PropTypes.array,
  uploadInfo: PropTypes.object,
  id: PropTypes.number,
};
