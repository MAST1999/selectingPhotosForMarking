import { Box, Center, Heading } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

function MarkingComponent({ photo, label }) {
  const canvasRef = useRef(null);
  const [allInfo, setAllInfo] = useState([]);
  const [dimensionsForCanvas, setDimensionsForCanvas] = useState({
    width: window.innerWidth * 0.7,
    height: window.innerHeight * 0.87,
  });
  const [coordsFirst, setCoordsFirst] = useState([]);
  const [coordsSecond, setCoordsSecond] = useState([]);
  const [colors, setColors] = useState([]);
  const [drawing, setDrawing] = useState(false);
  const [firstRefresh, setFirstRefresh] = useState(true);

  // making the img so that we can draw it on canvas
  let img = document.createElement("img");
  img.src = photo;

  // DPI fix for canvas
  let dpi = window.devicePixelRatio;
  const fixDPI = () => {
    let styleHeight = +getComputedStyle(canvasRef.current)
      .getPropertyValue("height")
      .slice(0, -2);
    let styleWidth = +getComputedStyle(canvasRef.current)
      .getPropertyValue("width")
      .slice(0, -2);

    canvasRef.current.setAttribute("height", styleHeight * dpi);
    canvasRef.current.setAttribute("width", styleWidth * dpi);
  };

  // draw the rectangle on the canvas based on the given coordinations
  const rectangleDrawing = (firstCoords, secondCoords) => {
    console.log(
      "Drawing:",
      firstCoords.length,
      secondCoords.length,
      colors.length
    );
    for (let i = secondCoords.length; i > 0; i--) {
      const maxHeight = Math.max(secondCoords[i - 1].y, firstCoords[i - 1].y);
      const maxWidth = Math.max(secondCoords[i - 1].x, firstCoords[i - 1].x);
      const minHeight = Math.min(secondCoords[i - 1].y, firstCoords[i - 1].y);
      const minWidth = Math.min(secondCoords[i - 1].x, firstCoords[i - 1].x);

      const widthOfRectangle = maxWidth - minWidth;

      const heightOfRectangle = maxHeight - minHeight;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      ctx.beginPath();
      ctx.rect(minWidth, minHeight, widthOfRectangle, heightOfRectangle);

      ctx.lineWidth = 2;
      ctx.strokeStyle = colors[i - 1];
      ctx.stroke();
    }
  };

  // the name explains itself
  const drawImageInCanvas = () => {
    fixDPI();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth * 0.7;
    canvas.height = window.innerHeight * 0.87;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    img.onload = () => {
      var scale = Math.min(
        canvas.width / img.width,
        canvas.height / img.height
      );
      setDimensionsForCanvas({
        width: img.width * scale,
        height: img.height * scale,
      });
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      ctx.drawImage(img, 0, 0, img.width * scale, img.height * scale);
    };
  };

  const checkForInfoOfPhoto = () => {
    let answer = { has: false, index: -1 };
    allInfo.forEach((info, index) => {
      if (info.photo === photo) {
        answer = { has: true, index };
      }
    });

    return answer;
  };

  useEffect(() => {
    if (photo === "") return;

    const comparingArray = [];
    if (JSON.stringify(allInfo) === JSON.stringify(comparingArray)) {
      console.log("first");
      setFirstRefresh(firstRefresh);
      drawImageInCanvas();
    } else {
      setFirstRefresh(!firstRefresh);
      console.log("second");
      drawImageInCanvas();
      const hasInfo = checkForInfoOfPhoto();
      if (hasInfo.has === true) {
        const photoInfo = allInfo[hasInfo.index];
        setCoordsFirst(photoInfo.coordsFirst);
        setCoordsSecond(photoInfo.coordsSecond);
        setColors(photoInfo.colors);
      } else {
        setCoordsFirst([]);
        setCoordsSecond([]);
        setColors([]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photo]);

  useEffect(() => {
    if (
      coordsFirst.length > 0 &&
      coordsSecond.length > 0 &&
      drawing.isDrawing === false &&
      label.color !== ""
    ) {
      console.log(
        "color",
        colors,
        "coordinations",
        coordsFirst,
        coordsSecond,
        "All Info: ",
        allInfo
      );

      rectangleDrawing(coordsFirst, coordsSecond);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawing]);

  // this is the part where the data of clicked places are saved
  const saveFirstCoordinations = (Event) => {
    Event.preventDefault();

    setDrawing({ isDrawing: true });

    if (label.color !== "") {
      const imgPixelAddressX = Event.pageX - canvasRef.current.offsetLeft;
      const imgPixelAddressY = Event.pageY - canvasRef.current.offsetTop;

      setCoordsFirst([
        ...coordsFirst,
        { x: imgPixelAddressX, y: imgPixelAddressY },
      ]);
    }
  };

  useEffect(() => {
    console.log(firstRefresh);
    if (
      coordsFirst.length > 0 &&
      coordsSecond.length > 0 &&
      drawing.isDrawing === false &&
      label.color !== ""
    ) {
      console.log(
        "color",
        colors,
        "coordinations",
        coordsFirst,
        coordsSecond,
        "All Info: ",
        allInfo
      );

      rectangleDrawing(coordsFirst, coordsSecond);
    }
  }, [firstRefresh]);

  const saveSecondCoordinations = (Event) => {
    Event.preventDefault();

    if (label.color !== "") {
      const imgPixelAddressX = Event.pageX - canvasRef.current.offsetLeft;
      const imgPixelAddressY = Event.pageY - canvasRef.current.offsetTop;

      setCoordsSecond([
        ...coordsSecond,
        { x: imgPixelAddressX, y: imgPixelAddressY },
      ]);

      setColors([...colors, label.color]);

      const newAllInfo = allInfo.filter((info) => info.photo !== photo);
      setAllInfo([
        ...newAllInfo,
        {
          photo,
          coordsFirst,
          coordsSecond: [
            ...coordsSecond,
            { x: imgPixelAddressX, y: imgPixelAddressY },
          ],
          colors: [...colors, label.color],
        },
      ]);

      console.log("all info", allInfo);
    }

    setDrawing({ isDrawing: false });
  };

  // If the photo was not selected yet
  if (photo === "") {
    return (
      <Center>
        <Heading>Select A Photo To Start!</Heading>
      </Center>
    );
  } else {
    return (
      <Center m="0px" p="0px" h="100%">
        <Box
          as="canvas"
          ref={canvasRef}
          onMouseDown={saveFirstCoordinations}
          onMouseUp={saveSecondCoordinations}
          width={dimensionsForCanvas.width}
          height={dimensionsForCanvas.height}
        ></Box>
      </Center>
    );
  }
}

export default MarkingComponent;
