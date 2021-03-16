import { Dialog, DialogTitle, Button, DialogContent } from "@material-ui/core";
import React from "react";

function OpenImages(props) {
  const { openDialog, loadPhotos } = props;

  return (
    <>
      <Dialog
        onClose={loadPhotos}
        aria-labelledby="simple-dialog-title"
        open={openDialog}
      >
        <DialogTitle id="simple-dialog-title">Load Photos</DialogTitle>
        <DialogContent>
          Please Select you photos from you local storage:
        </DialogContent>
      </Dialog>
    </>
  );
}

export default OpenImages;
