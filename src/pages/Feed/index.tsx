import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import FeedPages from '../../components/FeedPages';

const FeedPage = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}`}>
        <FeedPages />
      </Route>
      <Route path={`${path}/:id`}>{/* <OrderDetails /> */}</Route>
      <Route>
        <Redirect to={path} />
      </Route>
    </Switch>
  );
};

export default FeedPage;
