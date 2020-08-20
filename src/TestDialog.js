import React, { forwardRef } from "react";
import "./styles.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  TextField
} from "@material-ui/core";

const TestDialog = forwardRef((props, ref) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = (event) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <li onClick={handleClick} {...props}>
        <div onClick={handleClick}>{props.children}</div>
      </li>
      <Dialog open={open} onClose={handleClick} maxWidth="lg" fullWidth={true}>
        <DialogTitle>PRQS MM - {props["data-action-type"]}</DialogTitle>
        <DialogContent>
          <FormControl variant="filled" fullWidth style={{ marginTop: "25px" }}>
            <InputLabel>Text1:</InputLabel>
            <TextField id="text1" name="text1" />
          </FormControl>
          <br />
          <br />
          <br />
          <FormControl variant="filled" fullWidth>
            <InputLabel>Text2:</InputLabel>
            <TextField id="text2" name="text2" />
          </FormControl>
        </DialogContent>
        <DialogActions disableSpacing={false} color={"inherit"}>
          <Button onClick={handleClose} variant={"outlined"}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
});
export default TestDialog;
