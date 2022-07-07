import Cookies from 'js-cookie';
import { Route, Redirect, RouteProps } from 'react-router-dom';

const ProtectedRoute = ({ path, exact, children }: RouteProps) => {
  const isAuth = Cookies.get('accessToken');

  return (
    <Route
      path={path}
      exact={exact}
      render={({ location }) =>
        isAuth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                from: location,
              },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
