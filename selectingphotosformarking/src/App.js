import { Grid } from "@material-ui/core";
import React from "react";
import Header from "./components/Header";
import LeftNav from "./components/LeftNav";
import MainPanel from "./components/MainPanel";
import RightNav from "./components/RightNav";

function App() {
  return (
    <div className="App">
      <Grid container direction="column">
        <Grid item>
          <Header />
        </Grid>
        <Grid item>
          <MainPanel />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
