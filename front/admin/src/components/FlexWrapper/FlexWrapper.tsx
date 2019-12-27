import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

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
  },
  sideMenu: {
    flexShrink: 0,
    display: 'flex',
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
        <main className={classes.content}>{content}</main>
      </div>
    </div>
  );
}

export default FlexWrapper;
