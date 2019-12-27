import React, { ReactElement, useEffect } from 'react';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Preloader from '@components/Preloader/Preloader';
import { IStore } from '@store/reducer';
import { meRequest } from './redux/actions';
import { isLoggedSelector, isLoadingSelector } from './redux/selectors';
import Login from '@pages/Login/Login';

interface IProps {
  isLogged?: boolean;
  isLoading: boolean;
  children: ReactElement;
  meRequest: Function;
}

const Auth: React.FunctionComponent<IProps> = props => {
  const { isLogged, isLoading, children, meRequest } = props;
  useEffect(() => {
    meRequest();
  }, []);
  if (isLoading) return <Preloader position="fixed" size={60} />;
  return isLogged ? children : <Login />;
};

const mapStateToProps = (state: IStore) => {
  return {
    isLogged: isLoggedSelector(state),
    isLoading: isLoadingSelector(state),
  };
};

const mapDispatchToProps = {
  meRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
