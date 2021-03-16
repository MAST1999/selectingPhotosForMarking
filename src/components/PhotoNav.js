import { Flex } from "@chakra-ui/react";
import React from "react";

function PhotoNav({ setPhoto }) {
  const reload = true;
  let listOfImages = [];

  const importAll = (item) => {
    return item.keys().map(item);
  };

  if (reload) {
    listOfImages = importAll(
      require.context("../img", false, /\.(png|jpe?g)$/)
    );
  }

  return (
    <Flex direction="column" overflow="auto" maxHeight="100%" id="leftNav">
      {listOfImages.length
        ? listOfImages.map((image, index) => (
            <img
              src={image.default}
              key={`image-${index}`}
              alt="loading"
              onClick={() => setPhoto(image.default)}
            />
          ))
        : "No Images, Add more!"}
    </Flex>
  );
}

export default PhotoNav;
