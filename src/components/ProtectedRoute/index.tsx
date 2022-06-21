import Cookies from 'js-cookie';
import { Route, Redirect } from 'react-router-dom';

interface IProtectedRoute {
  path: string;
  exact?: boolean;
  children?: React.ReactNode;
}

const ProtectedRoute = ({ path, exact, children }: IProtectedRoute) => {
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
