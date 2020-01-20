import React from 'react';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, Theme } from '@material-ui/core/styles';

interface Props extends DialogProps {
  showCloseIcon?: boolean;
}

const useStyles = makeStyles((theme: Theme) => {
  return {
    closeButton: {},
    title: {
      '& > *': {
        display: 'flex',
        justifyContent: 'space-between',
      },
    },
  };
});

function _Dialog(props: Props) {
  const classes = useStyles();
  const { title, children, showCloseIcon, onClose, ...rest } = props;

  const handleClose = (e: React.MouseEvent) => {
    onClose && onClose(e, 'backdropClick');
  };

  return (
    <Dialog {...rest} onClose={onClose}>
      {title && (
        <DialogTitle className={classes.title}>
          {title}
          {showCloseIcon && onClose && (
            <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
              <CloseRoundedIcon />
            </IconButton>
          )}
        </DialogTitle>
      )}
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}

export default _Dialog;
