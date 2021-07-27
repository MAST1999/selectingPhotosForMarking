import React, { useEffect, useState } from 'react';
import { Image } from 'react-konva';
import PropTypes from 'prop-types';

function LoadedImage({ photo, setSize, size }) {
  const [image, setImage] = useState(null);
  const [imageSizes, setImageSizes] = useState({});

  useEffect(() => {
    if (photo) {
      setSize({
        width: window.innerWidth - 305,
        height: window.innerHeight - 350,
      });

      let newImage = new window.Image();
      newImage.onload = () => {
        setImageSizes({ width: newImage.width, height: newImage.height });
        setImage(newImage);
      };
      newImage.src = photo;
    }
  }, [photo]);

  useEffect(() => {
    if (image) {
      imageSizes.width = image.width;
      imageSizes.height = image.height;

      let wrh = imageSizes.width / imageSizes.height;
      let newWidth = size.width;
      let newHeight = newWidth / wrh;
      if (newHeight > size.height) {
        newHeight = size.height;
        newWidth = newHeight * wrh;
      }
      setImageSizes({ width: newWidth, height: newHeight });
      setSize({ width: newWidth, height: newHeight });
    }
  }, [image]);

  return <Image width={size.width} height={size.height} image={image} />;
}

export default LoadedImage;

LoadedImage.propTypes = {
  photo: PropTypes.string,
  setSize: PropTypes.func,
  size: PropTypes.object,
  setDefaultImageSizes: PropTypes.func,
};
