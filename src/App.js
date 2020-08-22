import React from "react";
import "./styles.css";
import TestDialog from "./TestDialog.js";
import UnsubscribePopup from "./UnsubscribePopup.js";
import { Button, Menu, MenuItem } from "@material-ui/core";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuEl: null,
      unsubscribeDialogOpen: false,
      actionKey: null
    };
  }

  setMenuEl = (target) => {
    this.setState({
      menuEl: target
    });
  };

  handleClick = (event) => {
    this.setMenuEl(event.currentTarget);
  };

  handleClose = () => {
    console.log("in handleClose...");
    this.setMenuEl(null);
  };

  openDialog = () => {
    this.setState({
      unsubscribeDialogOpen: true,
      actionKey: ""
    });
  };

  closeUnsubscribeDialog = () => {
    this.setState({
      unsubscribeDialogOpen: false,
      actionKey: null
    });
  };

  confirmUnsubscribe = () => {
    console.log("in confirmUnsubscribe ...");
    this.closeUnsubscribeDialog();
  };

  /*
  openConfirmationDialog = (actionStatus) => {
    this.setState({
      unsubscribeDialogOpen: true,
    });
  }
  */

  openConfirmationDialog = (actionStatus) => {
    return () => {
      if (actionStatus === "create") {
        alert("create stuff here");
      } else {
        this.setState({
          ...this.state,
          unsubscribeDialogOpen: true,
          actionKey: actionStatus
        });
      }
    };
  };

  render() {
    return (
      <div className="App">
        <div tabIndex="0">Click the button, to display menu or Dialog</div>
        <Button
          data-testid={"actionMenu"}
          disabled={false}
          onClick={this.handleClick}
          size={"medium"}
          variant={"contained"}
        >
          <span>Show Menu</span>
        </Button>

        <Menu
          anchorEl={this.state.menuEl}
          open={Boolean(this.state.menuEl)}
          keepMounted
          onClose={this.handleClose}
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
            onClick={this.handleClose}
          />
          <MenuItem
            children="Unsubscribe"
            button={true}
            onClick={this.openConfirmationDialog()}
          />
        </Menu>
        <Button
          data-testid={"actionDialog"}
          disabled={false}
          onClick={this.openConfirmationDialog("owner_delete")}
          size={"medium"}
          variant={"contained"}
        >
          <span>Show Dialog</span>
        </Button>
        <UnsubscribePopup
          closeUnsubscribeDialog={this.closeUnsubscribeDialog}
          unsubscribeDialogOpen={this.state.unsubscribeDialogOpen}
          selectedSubscriptionName={"subscription Name"}
          deleteAction={this.state.actionKey}
          confirmUnsubscribe={this.confirmUnsubscribe}
        />
      </div>
    );
  }
}
export default App;
