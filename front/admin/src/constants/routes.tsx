/* eslint-disable react/display-name */
import React from 'react';
import { HookRouter } from 'hookrouter';
import Lazy from '@components/Lazy/Lazy';
import Page from '@pages/Page/Page';

const basePath = '/teacher/admin';

interface Route {
  path: string;
  title: (param?: any) => string;
  render: (params: HookRouter.QueryParams) => JSX.Element;
  getPath?: (params: any) => string;
}

export const routes: {
  [key: string]: Route;
} = {
  dashboard: {
    path: `${basePath}`,
    title: () => 'Главная',
    render: function _Dashboard(): any {
      return () => <Lazy component={() => import('@pages/Dashboard/Dashboard')} />;
    },
  },
  page: {
    path: `${basePath}/page/:id`,
    title: (name: string) => `${name}`,
    getPath: (id: string) => {
      return `${basePath}/page/${id}`;
    },
    render: function _Page(params: any): any {
      return () => <Page activePageId={Number(params.id)} />;
    },
  },
  users: {
    path: `${basePath}/users`,
    title: (name: string) => `Конструктор | ${name}`,
    render: function _Users(): JSX.Element {
      return <div>users</div>;
    },
  },
  user: {
    path: `${basePath}/users/:id`,
    title: (name: string) => `Конструктор | ${name}`,
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
