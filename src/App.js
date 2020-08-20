import React from "react";
import "./styles.css";
import TestDialog from "./TestDialog.js";
import UnsubscribePopup from "./UnsubscribePopup.js";
import { Button, Menu, MenuItem } from "@material-ui/core";

export default function App() {
  const [menuEl, setMenuEl] = React.useState(null);

  const handleClick = (event) => {
    setMenuEl(event.currentTarget);
  };

  const handleClose = () => {
    console.log("in handleClose...");
    setMenuEl(null);
  };

  return (
    <div className="App">
      <div tabIndex="0">Click the button, to display menu</div>
      <Button
        data-testid={"actionMenu"}
        disabled={false}
        onClick={handleClick}
        size={"medium"}
        variant={"contained"}
      >
        <span>Show Menu</span>
      </Button>

      <Menu
        anchorEl={menuEl}
        open={Boolean(menuEl)}
        keepMounted
        onClose={handleClose}
        getContentAnchorEl={null}
        autoFocus={false}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
      >
        <MenuItem
          children="Delete"
          component={TestDialog}
          button={true}
          onClick={handleClose}
        />
        <MenuItem
          children="Unsubscribe"
          component={TestDialog}
          button={true}
          onClick={handleClose}
          s
        />
      </Menu>
    </div>
  );
}
