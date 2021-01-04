import React from "react";

function MarkingComponent({ photo }) {
  console.log(photo);
  return (
    <div id="markingDiv">
      {photo ? (
        <img
          src={photo}
          alt="Loading"
          style={{
            width: "200px",
            height: "200px",
            maxWidth: "60vw",
            maxHeight: "86vh",
          }}
        />
      ) : (
        "Select or load images first"
      )}
    </div>
  );
}

export default MarkingComponent;
