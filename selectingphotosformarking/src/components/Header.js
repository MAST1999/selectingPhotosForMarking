import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { AppBar, makeStyles, Toolbar, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  buttonStyle: {
    margin: "0px 5px",
  },
}));

function Header() {
  const classes = useStyles();

  return (
    <AppBar id="header" position="static">
      <Toolbar>
        <Button
          variant="contained"
          color="secondary"
          className={classes.buttonStyle}
        >
          <Typography variant="button">Instructions</Typography>
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.buttonStyle}
        >
          <Typography variant="button">Load Photos</Typography>
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
