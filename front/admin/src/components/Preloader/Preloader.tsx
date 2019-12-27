import React from 'react';
import { CircularProgress, CircularProgressProps } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import classNames from 'classnames';

interface IProps extends CircularProgressProps {
  position: 'fixed' | 'absolute';
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fixed: {
      height: '100%',
      width: '100%',
      left: 0,
      top: 0,
      position: 'fixed',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    absolute: {
      height: '100%',
      width: '100%',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  }),
);

const Preloader: React.FunctionComponent<IProps> = props => {
  const { position, ...rest } = props;
  const classes = useStyles();
  return (
    <div
      className={classNames({
        [classes[position]]: true,
      })}
    >
      <CircularProgress {...rest} />
    </div>
  );
};

export default Preloader;
