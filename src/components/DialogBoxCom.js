import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function BigDialog(props) {
  const { children, open, closeDialog, outSideFunction, title, isShowAction } = props;

  return (
    <div>
      <Dialog
        maxWidth="lg"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        {isShowAction && (
          <DialogActions>
            <Button onClick={closeDialog} color="primary" variant="outlined">
              Cancel
            </Button>
            <Button
              onClick={() => {
                outSideFunction();
                closeDialog();
              }}
              color="primary"
              variant="contained"
            >
              Submit
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
}

BigDialog.defaultProps = {
  open: false,
  isShowAction: true,
  closeDialog: () => {},
  outSideFunction: () => {},
  title: "title of the dialog",
};

BigDialog.propTypes = {
  /**
   * child component
   */
  children: PropTypes.node.isRequired,
  open: PropTypes.bool,
  closeDialog: PropTypes.func,
  outSideFunction: PropTypes.func,
  title: PropTypes.string,
  isShowAction: PropTypes.bool,
};
