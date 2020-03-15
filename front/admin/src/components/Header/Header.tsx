import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import HomeRounded from '@material-ui/icons/HomeRounded';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import { A } from 'hookrouter';
import { routes } from '@constants/routes';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tooltip from '@components/Tooltip/Tooltip';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { Box } from '@material-ui/core';
import Menu from '@components/Menu/Menu';
import { connect } from 'react-redux';
import { IStore } from '@store/reducer';
import { userSelector } from '@pages/Auth/redux/selectors';
import { IUser } from '@pages/Auth/types';
import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';
import MenuBookRoundedIcon from '@material-ui/icons/MenuBookRounded';
import MenuItem from '@material-ui/core/MenuItem';
import { logoutRequest } from '@pages/Auth/redux/actions';

interface IProps {
  user: IUser;
  logoutRequest: Function;
}

const useStyles = makeStyles((theme: Theme) => ({
  icon: {
    color: '#fff',
    display: 'block',

    '&:hover': {
      color: '#eee',
      transform: 'scale(1.05, 1.05)',
    },

    '&:active': {
      position: 'relative',
      left: 1,
      top: 1,
    },
  },

  textLinks: {
    display: 'flex',
    alignSelf: 'stretch',
    alignItems: 'center',

    '& hr': {
      backgroundColor: '#fff',
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },

    '& a, & p': {
      color: '#fff',
      textTransform: 'uppercase',
      textDecoration: 'none',
    },

    '& a:hover': {
      textDecoration: 'underline',
    },
  },

  textLinksItem: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    display: 'flex',

    '& .text': {
      paddingLeft: theme.spacing(0.5),

      '@media (max-width: 968px)': {
        display: 'none',
      },
    },
  },

  user: {
    maxWidth: 220,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },

  userInMenu: {
    borderBottom: '1px solid black',
    minWidth: 150,
    maxWidth: 250,
    whiteSpace: 'normal',
  },
}));

const Header: React.FunctionComponent<IProps> = ({ user, ...rest }) => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <ToolBar>
        <Grid container justify="space-between" alignItems="center">
          <Tooltip message="На главную" anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
            <A href={routes.dashboard.path} className={classes.icon}>
              <HomeRounded fontSize="large" />
            </A>
          </Tooltip>
          <Box component="div" className={classes.textLinks}>
            <Typography className={classes.textLinksItem}>
              <MenuBookRoundedIcon />
              <A href={routes.dashboard.path} className="text">
                Страницы
              </A>
            </Typography>
            <Typography className={classes.textLinksItem}>
              <MenuRoundedIcon />
              <A href={routes.menus.path} className="text">
                Меню
              </A>
            </Typography>
            {user.is_admin && (
              <Typography className={classes.textLinksItem}>
                <PeopleIcon />
                <A href={routes.users.path} className="text">
                  Пользователи
                </A>
              </Typography>
            )}
            <Typography className={classes.textLinksItem}>
              <SettingsRoundedIcon />
              <A href={routes.settings.path} className="text">
                Настройки
              </A>
            </Typography>
            <Divider light orientation="vertical" />
            <Menu
              toggler={
                <Box className={classes.textLinksItem}>
                  <PersonIcon />
                  <Typography className={`${classes.user} text`}>{user.login}</Typography>
                </Box>
              }
              whiteSpace
              maxWidth={250}
            >
              <MenuItem className={classes.userInMenu} disabled>
                <Typography>{user.login}</Typography>
              </MenuItem>
              <MenuItem>
                <A href={routes.user.getPath(user.login)}>
                  <Typography>Настройки</Typography>
                </A>
              </MenuItem>
              <MenuItem onClick={() => rest.logoutRequest()}>
                <Typography>Выйти</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Grid>
      </ToolBar>
    </AppBar>
  );
};

const mapStateToProps = (state: IStore) => {
  return {
    user: userSelector(state),
  };
};

const mapDispatchToProps = {
  logoutRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
