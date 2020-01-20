import React from 'react';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import classNames from 'classnames';
import { makeStyles, Theme } from '@material-ui/core/styles';

interface IProps extends Partial<MenuProps> {
  toggler: React.ReactElement;
  children: React.ReactElement;
  open?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  menuToggler: {
    cursor: 'pointer',
  },
}));

const _Menu: React.FunctionComponent<any> = props => {
  const classes = useStyles();
  const { toggler, children } = props;
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const doOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const doClose = () => {
    setAnchorEl(null);
  };

  const Toggler = React.cloneElement(toggler, {
    onClick: doOpen,
    className: classNames({
      [toggler.props.className]: !!toggler.props.className,
      [classes.menuToggler]: true,
    }),
  });

  const open = props.open !== undefined ? props.open : !!anchorEl;
  return (
    <React.Fragment>
      {Toggler}
      <Menu disableAutoFocus disableAutoFocusItem open={open} anchorEl={anchorEl} onClose={doClose}>
        {children}
      </Menu>
    </React.Fragment>
  );
};

export default _Menu;
