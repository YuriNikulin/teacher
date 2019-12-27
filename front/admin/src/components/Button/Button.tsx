import React from 'react';
import MaterialButton, { ButtonProps } from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import * as colors from '@material-ui/core/colors';
import classNames from 'classnames';

interface IButton extends ButtonProps {
  isLoading?: boolean;
  spinnerColor?: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonProgress: {
      color: 'white'
    },
    buttonProgressContainer: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(255, 255, 255, .4)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    contentHidden: {
      visibility: 'hidden'
    }
  }),
);

const Button: React.FunctionComponent<IButton> = ({
  children,
  isLoading,
  spinnerColor,
  ...rest
}) => {
  const classes = useStyles();
  const contentClassname = classNames({
    [classes.contentHidden] : isLoading
  })

  return (
    <MaterialButton { ...rest }>
      <div className={ contentClassname }>
        { children }
      </div>
      { isLoading && (
        <div className={classes.buttonProgressContainer}>
          <CircularProgress size={24} className={classes.buttonProgress} />
        </div>) 
      }
    </MaterialButton>
  )
}

export default Button;