import React from 'react';
import { HookRouter } from 'hookrouter';
import Lazy from '@components/Lazy/Lazy';
// import Dashboard from '@pages/Dashboard/Dashboard';

const basePath = '/teacher/admin';

interface Route {
  path: string;
  render: (params: HookRouter.QueryParams) => JSX.Element;
}

export const routes: {
  [key: string]: Route;
} = {
  dashboard: {
    path: `${basePath}`,
    render: function _Dashboard(): JSX.Element {
      return <Lazy component={() => import('@pages/Dashboard/Dashboard')} />;
    },
  },
  users: {
    path: `${basePath}/users`,
    render: function _Users(): JSX.Element {
      return <div>users</div>;
    },
  },
  user: {
    path: `${basePath}/users/:id`,
    render: function _User(id): JSX.Element {
      return <div>{id}</div>;
    },
  },
};

export const getRoutes = (): HookRouter.RouteObject => {
  const routesObject: HookRouter.RouteObject = {};
  Object.values(routes).forEach((route: Route) => {
    routesObject[route.path] = route.render;
  });
  return routesObject;
};
