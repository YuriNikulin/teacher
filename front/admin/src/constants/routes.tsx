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
  getPath: (params?: any) => string;
}

type RoutesEnum = 'dashboard' | 'page' | 'users' | 'user' | 'menus' | 'menu' | 'settings';

export const routes: {
  [key in RoutesEnum]: Route;
} = {
  dashboard: {
    path: `${basePath}`,
    title: () => 'Главная',
    getPath: () => `${basePath}`,
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
    title: () => `Пользователи`,
    getPath: () => `${basePath}/users`,
    render: function _Users(): any {
      return () => <Lazy component={() => import('@pages/Users/Users')} />;
    },
  },
  user: {
    path: `${basePath}/users/:login`,
    title: (name: string) => name,
    getPath: (login: string) => {
      return `${basePath}/users/${login}`;
    },
    render: function _User(params: any): any {
      return () => <Lazy props={{ activeUserLogin: params.login }} component={() => import('@pages/Users/Users')} />;
    },
  },
  menus: {
    path: `${basePath}/menu`,
    title: () => 'Меню',
    getPath: () => `${basePath}/menu`,
    render: function Menu(): any {
      return () => <Lazy component={() => import('@pages/Menu/Menu')} />;
    },
  },
  menu: {
    path: `${basePath}/menu/:id`,
    title: () => 'Меню',
    getPath: (id: string) => `${basePath}/menu/${id}`,
    render: function Menu(params: any): any {
      return () => <Lazy props={{ activeMenuId: params.id }} component={() => import('@pages/Menu/Menu')} />;
    },
  },
  settings: {
    path: `${basePath}/settings`,
    title: () => 'Настройки',
    getPath: (id: string) => `${basePath}/menu`,
    render: function Menu(params: any): any {
      return () => <Lazy component={() => import('@pages/Settings/Settings')} />;
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
