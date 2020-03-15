import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import classNames from 'classnames';

interface Props {
  header?: React.ReactElement;
  content?: React.ReactElement;
  sidemenu?: React.ReactElement;
}

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  contentWrapper: {
    overflow: 'auto',
    display: 'flex',
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    position: 'relative',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    overflow: 'auto',
    '& .title': {
      marginBottom: theme.spacing(4),
    },
  },
  contentWithSidemenu: {
    // paddingLeft: theme.spacing(3),
  },
  sideMenu: {
    flexShrink: 0,
    display: 'flex',
    position: 'relative',
    zIndex: 1,
  },
}));

function FlexWrapper(props: Props) {
  const classes = useStyles();
  const { header, content, sidemenu } = props;
  return (
    <div className={classes.wrapper}>
      {header}
      <div className={classes.contentWrapper}>
        <div className={classes.sideMenu}>{sidemenu}</div>
        <main
          className={classNames({
            [classes.content]: true,
            [classes.contentWithSidemenu]: !!sidemenu,
          })}
        >
          {content}
        </main>
      </div>
    </div>
  );
}

export default FlexWrapper;
