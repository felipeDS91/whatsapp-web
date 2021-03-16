import React from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from 'react-router-dom';

import DefaultLayout from '../pages/_layouts/default';
import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  if (!user && isPrivate) {
    return <Redirect to="/" />;
  }

  if (!!user && !isPrivate) {
    return <Redirect to="/home" />;
  }

  return (
    <ReactDOMRoute
      {...rest}
      render={() => {
        return user ? (
          <DefaultLayout>
            <Component />
          </DefaultLayout>
        ) : (
          <Component />
        );
      }}
    />
  );
};

export default Route;
