import React, { useEffect } from 'react';
import Popover, { PopoverProps } from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

interface IProps extends Partial<PopoverProps> {
  children: React.ReactElement;
  message: string;
  open?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    popover: {
      pointerEvents: 'none',
    },
    paper: {
      padding: theme.spacing(1),
    },
  }),
);

const Tooltip: React.FunctionComponent<IProps> = props => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const { children, message, ...rest } = props;

  const doOpen = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl(e.currentTarget);
  };

  const doClose = () => {
    setAnchorEl(null);
  };

  const open: boolean = props.open !== undefined ? props.open : !!anchorEl;
  return (
    <React.Fragment>
      <span onMouseEnter={doOpen} onMouseLeave={doClose}>
        {children}
      </span>
      <Popover
        classes={{
          paper: classes.paper,
        }}
        {...rest}
        className={classes.popover}
        open={open}
        anchorEl={anchorEl}
      >
        <Typography>{message}</Typography>
      </Popover>
    </React.Fragment>
  );
};

export default Tooltip;
