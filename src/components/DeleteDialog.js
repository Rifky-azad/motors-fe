import React from "react";
import DialogBoxCom from "./DialogBoxCom";

export default function DeleteDialog(props) {
  const { outSideFunction, open, closeDialog } = props;
  return (
    <DialogBoxCom
      title="Are you want to Delete"
      outSideFunction={outSideFunction}
      open={open}
      closeDialog={closeDialog}
    >
      <div>Are you want to Delete ?</div>
    </DialogBoxCom>
  );
}
