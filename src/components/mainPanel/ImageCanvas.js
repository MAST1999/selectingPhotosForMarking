import { Box, Center } from '@chakra-ui/layout';
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Layer, Rect, Stage } from 'react-konva';
import LoadedImage from './LoadedImage';
import axios from 'axios';

function ImageCanvas({ photo, currentRegion, setCoordsInfo, id, allRegions }) {
  const [size, setSize] = useState({ width: 600, height: 1560 });

  const prevPhoto = useRef(null);
  const [rectAnnotations, setRectAnnotations] = useState([]);
  const [newRectAnnotation, setNewRectAnnotation] = useState([]);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (photo !== prevPhoto) setRectAnnotations([]);
    prevPhoto.current = photo;
    if (photo) loadInfo();
  }, [photo]);

  const loadInfo = async () => {
    const res = await axios.get(`http://localhost:4000/api/photos/${id}`);
    let tempArray = [];
    res.data.coords.map(coord => {
      let regionColor = '';
      let regionId = null;
      for (let region of allRegions) {
        console.log(coord);
        if (region.id === coord.regionId) {
          regionColor = region.color;
          regionId = coord.regionId;
        }
      }
      console.log(regionColor);
      tempArray.push({
        x: coord.firstcoord,
        y: coord.secondcoord,
        id: `rect-${coord.id}`,
        width: coord.width,
        height: coord.height,
        key: coord.id,
        color: regionColor,
        isDragging: false,
        regionId,
      });
    });
    setRectAnnotations(tempArray);
  };

  const handleDragStart = event => {
    const id = event.target;
    setRectAnnotations(
      rectAnnotations.map(rect => {
        return {
          ...rect,
          isDragging: rect.id === id,
        };
      })
    );
  };

  const handleDragEnd = event => {
    setDragging(false);
    console.log(rectAnnotations);
    const newRectAnno = rectAnnotations.map(rect => {
      if (rect.isDragging !== false) {
        return {
          ...rect,
          x: event.target.x(),
          y: event.target.y(),
          isDragging: false,
        };
      }
      return {
        ...rect,
        isDragging: false,
      };
    });
    console.log(newRectAnno);
    setRectAnnotations(newRectAnno);
    setCoordsInfo(newRectAnno);
  };

  const handleDragMove = () => {
    setNewRectAnnotation([]);
  };

  const handleMouseDown = event => {
    if (newRectAnnotation.length === 0 && !dragging && currentRegion.color) {
      const { x, y } = event.target.getStage().getPointerPosition();
      setNewRectAnnotation([
        { x, y, width: 0, height: 0, key: '0', color: currentRegion.color },
      ]);
    }
  };

  const handleMouseUp = event => {
    if (newRectAnnotation.length === 1) {
      const sx = newRectAnnotation[0].x;
      const sy = newRectAnnotation[0].y;
      const { x, y } = event.target.getStage().getPointerPosition();
      const annotationToAdd = {
        x: sx,
        y: sy,
        width: x - sx,
        height: y - sy,
        key: rectAnnotations.length + 1,
        isDragging: false,
        color: currentRegion.color,
        id: `rect-${rectAnnotations.length + 1}`,
        regionId: currentRegion.id,
      };
      rectAnnotations.push(annotationToAdd);
      setNewRectAnnotation([]);
      setRectAnnotations(rectAnnotations);
      console.log('here', rectAnnotations);
      setCoordsInfo(rectAnnotations);
    }
  };

  const handleMouseMove = event => {
    if (newRectAnnotation.length === 1) {
      const sx = newRectAnnotation[0].x;
      const sy = newRectAnnotation[0].y;
      const { x, y } = event.target.getStage().getPointerPosition();
      setNewRectAnnotation([
        {
          x: sx,
          y: sy,
          width: x - sx,
          height: y - sy,
          key: '0',
          isDragging: false,
          color: currentRegion.color,
        },
      ]);
    }
  };

  const rectAnnotationsToDraw = [...rectAnnotations, ...newRectAnnotation];
  return (
    <Box flexGrow="1" h="100%" overflow="auto">
      {photo ? (
        <Stage
          width={size.width}
          height={size.height}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <Layer>
            <LoadedImage photo={photo} setSize={setSize} size={size} />
          </Layer>
          <Layer>
            {rectAnnotationsToDraw.map((value, i) => {
              return (
                <Rect
                  draggable
                  key={i}
                  x={value.x}
                  y={value.y}
                  width={value.width}
                  height={value.height}
                  fill="transparent"
                  stroke={value.color}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  onDragMove={handleDragMove}
                  id={value.id}
                />
              );
            })}
          </Layer>
        </Stage>
      ) : (
        <Center h="100%" flexGrow="1">
          Select a photo to start
        </Center>
      )}
    </Box>
  );
}

ImageCanvas.propTypes = {
  photo: PropTypes.string,
  currentRegion: PropTypes.object,
  setCoordsInfo: PropTypes.func,
  id: PropTypes.number,
  allRegions: PropTypes.array,
};

export default ImageCanvas;
