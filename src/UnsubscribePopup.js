import Dialog from "@material-ui/core/Dialog";
import PropTypes from "prop-types";
import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  unsubscribeDialogTitle: {
    padding: "10px",
    textAlign: "center",
    color: "black",
    fontFamily: "Roboto",
    fontWeight: 500
  },
  unsubscribeDialogName: {
    fontWeight: 200,
    fontFamily: "Roboto"
  },
  unsubscribeDialogMenu: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "10px",
    fontSize: "0.9em"
  },
  unsubscribeButton: {
    borderRadius: "2px",
    borderStyle: "solid",
    color: "#53586A",
    cursor: "pointer",
    fontWeight: 500,
    padding: "4px 10px",
    marginRight: "20px",
    "&:active": {
      filter: "brightness(75%)"
    }
  },
  cancelButton: {
    backgroundColor: "white",
    "&:active": {
      filter: "brightness(75%)"
    }
  }
};

/**
 * The UnsubscribePopup is a precaution step from taking the users
 * dn out of the respective subscription recipient list
 */
class UnsubscribePopup extends React.Component {
  render() {
    const { classes } = this.props;
    const actionType =
      this.props.deleteAction === "owner_delete" ? "delete" : "unsubscribe";
    return (
      <Dialog
        aria-modal={true}
        aria-labelledby={classes.unsubscribeDialogTitle}
        onBackdropClick={this.props.closeUnsubscribeDialog}
        open={this.props.unsubscribeDialogOpen}
      >
        <div
          id="unsubscribeDialogTitle"
          className={classes.unsubscribeDialogTitle}
        >
          <span>
            Are you sure you want to {actionType} from this subscription:
          </span>
          <br />
          <span className={classes.unsubscribeDialogName}>
            {this.props.selectedSubscriptionName}.
          </span>
          <br />
          <span className={classes.unsubscribeDialogName}>
            Press tab or select the action you want to take.
          </span>
        </div>
        <div className={classes.unsubscribeDialogMenu}>
          <button
            id="cancelButton"
            className={`${classes.unsubscribeButton} ${classes.cancelButton}`}
            aria-label={"Press the enter key to cancel this action."}
            onClick={this.props.closeUnsubscribeDialog}
            autoFocus
          >
            Cancel
          </button>
          <button
            id="unsubscribeButton"
            className={classes.unsubscribeButton}
            size="small"
            onClick={this.props.confirmUnsubscribe}
            aria-label={`Press the enter key to ${actionType} from subscription ${this.props.selectedSubscriptionName}.`}
          >
            Unsubscribe
          </button>
        </div>
      </Dialog>
    );
  }
}

UnsubscribePopup.propTypes = {
  innerColors: PropTypes.object,
  closeUnsubscribeDialog: PropTypes.func.isRequired,
  unsubscribeDialogOpen: PropTypes.bool.isRequired,
  selectedSubscriptionName: PropTypes.string.isRequired,
  confirmUnsubscribe: PropTypes.func.isRequired
};

export default withStyles(styles)(UnsubscribePopup);
