import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { getPortalActiveInnerTheme } from '../selectors'
import IconButton from '@material-ui/core/IconButton'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'

const styles = (theme) => ({
  selectDismissDiv: {
    width: '550px',
    height: '30px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: theme.zIndex.selectDismissDiv,
    backgroundColor: props => { return props.innerColors.dismissAllBlock },
    color: props => { return props.innerColors.bodyText },
  },
  listDismissDiv: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.90em',
    minHeight: 0
  },
  listSelectAllButton: {
    width: '30px',
    height: '30px',
    color: props => { return props.innerColors.bodyText },
    padding: [[0], '!important']
  },
  listSelectAllCheckbox: {
    color: props => { return props.innerColors.bodyText }
  },
  selectMultiDismissButton: {
    fontWeight: '500',
    fontFamily: 'Roboto',
    height: '1.5em',
    borderStyle: 'none',
    marginRight: '10px',
    fontSize: '0.85em',
    textAlign: 'center',
    verticalAlign: 'middle',
    '&:hover': {
      cursor: 'pointer',
      opacity: 0.7,
      border: '2px solid #999999',
    },
    color: props => { return props.innerColors.dismissAllButtonText },
    backgroundColor: props => { return props.innerColors.bodyText },
  },
   dismissAllTitle: {
    fontSize: '1.1em',
    fontWeight: '700',
    padding: '10px',
    textAlign: 'center',
  },
 dismissDialogDescription: {
    fontSize: '0.95em',
    fontWeight: '300',
    textAlign: 'left',
    padding: '15px 20px',
  },
  dismissDialogDescriptionText: {
    margin: '10px 0px',
  },
  ndismissAllDialogMenu: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '10px',
    fontSize: '0.9em',
    color: props => { return props.innerColors.mediumContrast },
  },
  cancelDismissDialogButton: {
    borderStyle: 'solid',
    cursor: 'pointer',
    fontWeight: '500',
    padding: '4px 10px',
    marginRight: '20px',
    '&:hover': {
      opacity: 0.4,
      border: '2px solid #999999',
    }
  },
  dismissDialogButton: {
    borderStyle: 'solid',
    cursor: 'pointer',
    fontWeight: '500',
    padding: '4px 10px',
    background: '#8bd825',
    '&:hover': {
      opacity: 0.5,
      border: '2px solid #999999',
    }
  },
})

/**
 * SelectDismissableItems
 * This component selects all dismissable items.
 * If the option is to select all items,
 * a dialog is displayed to confirm that the user wants to
 * dismiss all the dismissable items currently shown
 * in the window. If the user presses the dismiss button the 
 * items are "hidden" from the list view but may be recovered
 * from the trash view page.
 */
class SelectDismissableItemss extends React.Component {

  /**
   * Constructor
   */
  constructor(props) {
    super(props)
    this.state = {
      checkboxAriaSelected: false,
      displayIndeterminateCheckBox: false,
      openDismissConfirmDialog: false
    }
  }

  /* Helper function to compare each value in the arrays to ensure they are equal */
  matchArrays = (arr1, arr2) => {
    const containsAll = (arr1, arr2) => 
      arr2.every(arr2Item => arr1.includes(arr2Item))
    return containsAll(arr1, arr2) && containsAll(arr2, arr1)
  }

  componentDidUpdate(prevProps) {
    if(prevProps.selectedDismiss !== this.props.selectedDismiss && this.props.selectedDismiss
      && this.props.allDismissableIds.length > 0
      || (prevProps.allDismissableIds !== this.props.allDismissableIds)
    ) {
      if (this.props.selectedDismiss.length === 0) {
        this.setState({
          ...this.state,
          checkboxAriaSelected: false, 
          displayIndeterminateCheckBox: false
        })
      }
      else if (this.matchArrays(this.props.selectedDismiss, this.props.allDismissableIds)) {
        this.setState({
          ...this.state,
          checkboxAriaSelected: true, 
          displayIndeterminateCheckBox: false
        })
      }
      else if (this.props.selectedDismiss.length !== this.props.allDismissableIds.length) {
        this.setState({
          ...this.state,
          checkboxAriaSelected: true, 
          displayIndeterminateCheckBox: true
        })
      } else {
        this.setState({
          ...this.state,
          checkboxAriaSelected: false, 
          displayIndeterminateCheckBox: false
        })
      } 
    }
  }

  closeDismissDialog = () => {
    this.props.clearDismissProps()
    this.setState({
      ...this.state,
      openDismissConfirmDialog: false
    })
  }

  openDismissDialog = () => {
    this.setState({
      ...this.state,
      openDismissConfirmDialog: true
    })
  }

  confirmDismissAllItemss = () => {
    if (this.props.allDismissableIds.length === this.props.selectedDismiss.length) {
      this.props.hideAllDismissableItems()
    } else {
      this.props.toggleHideMulti()
    }
    this.closeDismissDialog()
  }

  renderDismissAllCheckbox() {
    const {classes} = this.props
    let ariaLabel = 'No items on this page currently selected to be dismissed.'
      + ' Press enter to select all dismissable items.'
    const dismissInstructionAriaLabel = 'Press the tab key to dismiss the selected items.'
    let selectedAriaLabel = 'All dismissable items selected.' + dismissInstructionAriaLabel
    let onClickFunction = this.handleSelectAllCheckbox
    let renderCheckbox = ( <i id='emptyCheckBox' className={`${classes.listSelectAllCheckbox} far fa-sm fa-square`} /> )
    let checkboxText = 'Select All'

    if (this.state.checkboxAriaSelected && this.state.displayIndeterminateCheckBox) {
      onClickFunction = this.handleUnSelectAllCheckbox
      renderCheckbox = ( <i id='dashCheckBox' className={`${classes.listSelectAllCheckbox} fas fa-sm fa-minus-square`}/> )
      selectedAriaLabel = 'Some dismissable items
      
      selected.'
        + dismissInstructionAriaLabel
      checkboxText = 'Select'
    }
    else if (this.state.checkboxAriaSelected) {
      onClickFunction = this.handleUnSelectAllCheckbox
      renderCheckbox = ( <i id='checkedCheckBox' className={`${classes.listSelectAllCheckbox} fas fa-sm fa-check-square`}/> )
    }
    return (
      <div id='listSelectAllDismissableButton' className={classes.listDismissDiv}>
        <IconButton
          id='dismissSelectAllIconButton'
          className={classes.listSelectAllButton}
          style={{color: 'inherit'}}
          aria-label={this.state.checkboxAriaSelected ? selectedAriaLabel : ariaLabel}
          onClick={onClickFunction}
        >
          { renderCheckbox }
        </IconButton>
        { checkboxText }
      </div>
    )
  }

  handleSelectAllCheckbox = () => {
    this.props.selectAll()
    this.toggleSelectedCheckbox()
  }

  handleUnSelectAllCheckbox = () => {
    this.props.clearDismissProps()
    this.toggleSelectedCheckbox()
  }

  toggleSelectedCheckbox = () => {
    if ((this.state.checkboxAriaSelected && this.props.selectedDismiss.length === 0)
      || (this.props.selectedDismiss.length === 0 && this.props.allDismissableIds.length === 0)) {
      this.setState({
        ...this.state,
        checkboxAriaSelected : false,
        displayIndeterminateCheckBox: false
      })
    } else {
      this.setState({
        ...this.state,
        checkboxAriaSelected : !this.state.checkboxAriaSelected
      })
    }
  }

  renderDismissButton() {
    const {classes} = this.props

    if (this.props.selectedDismiss &&
        this.props.allDismissableIds.length > 0 &&
        this.props.selectedDismiss.length > 0 ) {
      return (
        <div id='listDismissAllDiv' className={classes.listDismissDiv}>
          <button
            aria-label={`Press the enter key to dismiss all selected dismissable items.`}
            id='selectMultiDismissButton'
            className={classes.selectMultiDismissButton}
            onClick={this.openDismissDialog}>
            Dismiss
          </button>
        </div>
      )
    }
  }

  renderDismissDialogTitleContent() {
    const {classes} = this.props

    const dismissNotificationCount = 
      (this.props.selectedDismiss.length === this.props.allDismissableIds.length)
      ? this.props.allDismissableIds.length :  this.props.selectedDismiss.length
    const dismissNotificationText = `Dismiss ${dismissNotificationCount} items ?`

    return (
      <DialogTitle id='dismissAllDialogTitle' className={classes.dismissAllTitle}>
        <span>{dismissNotificationText}</span>
      </DialogTitle>
    )
  }

  renderDismissDialogContent() {
    const {classes} = this.props

    return (
      <DialogContent id='dismissAllDialogContent' className={classes.dismissDialogDescription}>
        <p className={classes.dismissDialogDescriptionText}>Select dismiss, if you want to hide the selected dismissable items.</p>
        <p className={classes.dismissDialogDescriptionText}>Select cancel, if you want to close this window without dismissing any items.</p>
      </DialogContent>
    )
  }

  renderDismissDialog() {
    const {classes} = this.props

    return (
      <Dialog
        open={this.state.openDismissConfirmDialog}
        onClose={this.closeDismissDialog}
        aria-labelledby='dismissAllDialogTitle'
        aria-describedby='dismissAllDialogContent'
        aria-modal={true}>
        {this.renderDismissDialogTitleContent()}
        {this.renderDismissDialogContent()}
        <DialogActions>
          <div className={classes.dismissAllDialogMenu}>
            <button
              id='cancelDismissAllDialogButton'
              autoFocus
              className={classes.cancelDismissDialogButton}
              onClick={this.closeDismissDialog} >
              Cancel
            </button>
            <button
              id='dismissAllDialogButton'
              className={classes.dismissDialogButton}
              onClick={this.confirmDismissAllItemss} >
              Dismiss
            </button>
          </div>
        </DialogActions>
      </Dialog>
    )
  }
  /**
   * Render the this Component
   */

  render() {
    const {classes} = this.props

    return(
      <div className={classes.selectDismissDiv}>
        {this.renderDismissAllCheckbox()}
        {this.renderDismissButton()}
        {this.renderDismissDialog()}
    </div>
    )
  }
}

SelectDismissableItems.propTypes = {
  allDismissableIds: PropTypes.array.isRequired,
  clearDismissProps: PropTypes.func.isRequired,
  hideAllDismissableItems: PropTypes.func.isRequired,
  innerColors: PropTypes.object,
  selectedDismiss: PropTypes.array.isRequired,
  selectAll: PropTypes.func.isRequired,
  toggleHideMulti: PropTypes.func,
}
export default (injectSheet(styles)(SelectDismissableItems))
