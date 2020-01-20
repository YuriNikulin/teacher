import React from 'react';
import { useRoutes, useRedirect } from 'hookrouter';
import { getRoutes, routes } from '@constants/routes';
import { connect } from 'react-redux';
import { IStore } from '@store/reducer';
import { isLoggedSelector } from '@pages/Auth/redux/selectors';

interface IProps {
  isLogged: boolean;
}

function Router(props: IProps): JSX.Element {
  const _routes = getRoutes();
  const routeResult = useRoutes(_routes);
  return routeResult ? routeResult() : <span>not found</span>;
}

const mapStateToProps = (state: IStore) => {
  return {
    isLogged: isLoggedSelector(state),
  };
};

export default connect(mapStateToProps, null)(Router);
