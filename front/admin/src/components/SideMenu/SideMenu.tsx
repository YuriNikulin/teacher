import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { ResizableBox } from 'react-resizable';
import Typography from '@material-ui/core/Typography';
import SwapHorizSharpIcon from '@material-ui/icons/SwapHorizSharp';

interface IProps {
  footer?: React.ReactElement;
  title?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  sideMenu: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    position: 'relative',
    // boxShadow: '3px 0 10px rgba(0,0,0,.5)',
    boxShadow: theme.shadows[7],

    '& .react-resizable': {
      height: 'auto !important',
      maxHeight: '100%',
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
    },

    '&:hover .resizer': {
      opacity: 1,
    },
  },
  wrapper: {
    maxHeight: '100%',
    overflow: 'auto',
    flexGrow: 1,
  },
  resizer: {
    background: 'rgba(255,255,255,.3)',
    opacity: 0,
    transition: '.1s ease-in-out',
    position: 'absolute',
    left: '100%',
    top: 0,
    bottom: 0,
    width: 20,
    // boxShadow: theme.shadows[7],
    cursor: 'ew-resize',
    display: 'block',

    '& .icon': {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
    },

    '&:hover .icon': {
      color: theme.palette.primary.light,
    },
  },
  footer: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    textAlign: 'center',
    boxShadow: theme.shadows[3],
  },
  title: {
    padding: `${theme.spacing(2)}px ${theme.spacing(2)}px`,
    boxShadow: theme.shadows[3],
  },
}));

const SideMenu: React.FunctionComponent<IProps> = props => {
  const classes = useStyles();
  const { title } = props;
  return (
    <div className={classes.sideMenu}>
      <ResizableBox
        className="box"
        width={250}
        height={200}
        axis="x"
        handle={
          <span className={`${classes.resizer} resizer`}>
            <SwapHorizSharpIcon fontSize="small" className="icon" />
          </span>
        }
        maxConstraints={[500, 0]}
        minConstraints={[100, 0]}
      >
        {title && (
          <Typography className={classes.title} variant="h6">
            {title}
          </Typography>
        )}
        <div className={classes.wrapper}>{props.children}</div>
        <div className={classes.footer}>{props.footer}</div>
      </ResizableBox>
    </div>
  );
};

export default SideMenu;
