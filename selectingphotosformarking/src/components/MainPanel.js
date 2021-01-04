import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import LeftNav from "./LeftNav";
import MarkingComponent from "./MarkingComponent";
import RightNav from "./RightNav";

function MainPanel() {
  const [selectedPhoto, setSelectedPhoto] = useState("");

  const newSelectPhoto = (photoName) => {
    setSelectedPhoto(photoName);
    console.log(photoName);
  };

  return (
    <div id="mainPanel">
      <Grid container>
        <Grid item xs={2}>
          <LeftNav handleNewPhoto={newSelectPhoto} />
        </Grid>
        <Grid item xs={8}>
          <MarkingComponent photo={selectedPhoto} />
        </Grid>
        <Grid item xs={2}>
          <RightNav />
        </Grid>
      </Grid>
    </div>
  );
}

export default MainPanel;
