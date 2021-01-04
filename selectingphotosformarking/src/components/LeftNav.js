import React from "react";

function LeftNav({ handleNewPhoto }) {
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
    <section id="leftNav">
      {listOfImages.length
        ? listOfImages.map((image, index) => (
            <img
              src={image.default}
              key={index}
              alt="loading"
              style={{ width: "200px", height: "200px" }}
              onClick={() => handleNewPhoto(image.default)}
            />
          ))
        : "No Images, Add more!"}
    </section>
  );
}

export default LeftNav;
