import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from '@chakra-ui/accordion';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { ListItem, OrderedList, Text } from '@chakra-ui/layout';
import { Box, Grid } from '@chakra-ui/layout';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

function LeftControls({ setPhoto, refresh, setId }) {
  const [allPhotos, setAllPhotos] = useState(null);
  const accordionPhotoLoad = useRef(null);

  useEffect(() => {
    axios
      .get('http://localhost:4000/api/photos')
      .then(photos => {
        if (photos.data.length > 0) {
          setAllPhotos(photos.data);
        }
      })
      .catch(error => console.log(error));
  }, [refresh]);

  return (
    <Grid flexBasis="335px" mt={5}>
      <Accordion allowToggle allowMultiple>
        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Region Shape
                  </Box>
                  {isExpanded ? (
                    <MinusIcon fontSize="12px" />
                  ) : (
                    <AddIcon fontSize="12px" />
                  )}
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>Shapes Will be here</AccordionPanel>
            </>
          )}
        </AccordionItem>
        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <h2>
                <AccordionButton ref={accordionPhotoLoad}>
                  <Box flex="1" textAlign="left">
                    Loaded Images
                  </Box>
                  {isExpanded ? (
                    <MinusIcon fontSize="12px" />
                  ) : (
                    <AddIcon fontSize="12px" />
                  )}
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Box maxW="300px" maxH="700px" display="flex" overflow="auto">
                  {allPhotos ? (
                    <OrderedList>
                      {allPhotos.map(photo => (
                        <ListItem
                          key={photo.id}
                          path={photo.path}
                          onClick={() => {
                            setPhoto(photo.path);
                            setId(photo.id);
                          }}
                        >
                          {photo.name}
                        </ListItem>
                      ))}
                    </OrderedList>
                  ) : (
                    <p>Upload some Photos</p>
                  )}
                </Box>
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Keyboard Shortcuts
                  </Box>
                  {isExpanded ? (
                    <MinusIcon fontSize="12px" />
                  ) : (
                    <AddIcon fontSize="12px" />
                  )}
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Text>n/p (←/→) Next/Previous image</Text>
                <Text>+ / - / = Zoom in/out/reset</Text>
                <Text>Ctrl + c Copy sel. regions</Text>
                <Text>Ctrl + v Paste sel. regions</Text>
                <Text>Ctrl + a Select all regions</Text>
                <Text>Del, Bkspc Delete image region</Text>
                <Text>Esc Cancel operation</Text>
                <Text>Ctrl + s Download annotations</Text>
                <Text>Spacebar Toggle image list</Text>
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      </Accordion>
    </Grid>
  );
}

LeftControls.propTypes = {
  setPhoto: PropTypes.func,
  refresh: PropTypes.bool,
  setId: PropTypes.func,
};

export default LeftControls;
