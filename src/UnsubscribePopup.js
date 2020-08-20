import Dialog from "@material-ui/core/Dialog";
import PropTypes from "prop-types";
import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  notifierUnsubscribeDialogTitle: {
    padding: "10px",
    textAlign: "center",
    color: "black",
    fontFamily: "Roboto",
    fontWeight: 500
  },
  notifierUnsubscribeDialogName: {
    fontWeight: 200,
    fontFamily: "Roboto"
  },
  notifierUnsubscribeDialogMenu: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "10px",
    fontSize: "0.9em"
  },
  notifierUnsubscribeButton: {
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
  notifierCancelButton: {
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
        aria-labelledby={classes.notifierUnsubscribeDialogTitle}
        onBackdropClick={this.props.closeUnsubscribeDialog}
        open={this.props.unsubscribeDialogOpen}
      >
        <div
          id="notifierUnsubscribeDialogTitle"
          className={classes.notifierUnsubscribeDialogTitle}
        >
          <span>
            Are you sure you want to ${actionType} from this subscription:
          </span>
          <br />
          <span className={classes.notifierUnsubscribeDialogName}>
            {this.props.selectedSubscriptionName}.
          </span>
          <br />
          <span className={classes.notifierUnsubscribeDialogName}>
            Press tab or select the action you want to take.
          </span>
        </div>
        <div className={classes.notifierUnsubscribeDialogMenu}>
          <button
            id={`notifierCancelButton-${this.props.selectedSubscriptionId}`}
            className={`${classes.notifierUnsubscribeButton} ${classes.notifierCancelButton}`}
            aria-label={"Press the enter key to cancel this action."}
            onClick={this.props.closeUnsubscribeDialog}
          >
            Cancel
          </button>
          <button
            id={`notifierUnsubscribeButton-${this.props.selectedSubscriptionId}`}
            className={classes.notifierUnsubscribeButton}
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
