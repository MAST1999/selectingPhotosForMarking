import { Box, Button, HStack, Input, List, ListItem } from "@chakra-ui/react";
import React, { useState } from "react";

function Labels({ setTheLabel }) {
  const [labels, setLabels] = useState([
    { name: "Truck", color: "#fff444" },
    { name: "Excavator", color: "#444fff" },
  ]);

  function* getRandomColor() {
    let letters = "0123456789ABCDEF";
    while (true) {
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      yield color;
    }
  }

  let generator = getRandomColor();

  const [value, setValue] = React.useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const addLabel = () => {
    let repeated = false;
    labels.forEach((label) => {
      if (label.name === value) repeated = true;
    });
    if (value !== "" && !repeated) {
      setLabels([...labels, { name: value, color: generator.next().value }]);
    }
  };

  console.log(labels);

  return (
    <Box>
      <HStack mb="8px">
        <Input
          value={value}
          onChange={handleChange}
          placeholder="Add new label!"
          size="md"
        />
        <Button onClick={addLabel} variant="solid" colorScheme="blue">
          Add
        </Button>
      </HStack>
      <List spacing={3}>
        {labels.map((label) => (
          <ListItem
            _before={{
              content: '" "',
              backgroundColor: label.color,
              display: "inline-block",
              width: "13px",
              height: "13px",
            }}
            onClick={() => setTheLabel(label)}
          >
            <Box ml={1} as="span" border={` 2px solid ${label.color}`}>
              {label.name}
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default Labels;
