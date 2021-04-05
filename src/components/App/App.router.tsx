import React from 'react';
import { useMemo } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { DASHBOARD, SUMMARY_PRICE_LIST, getRoute, MANAGE_PRICE_LIST, USERS } from '../../constants/pageNames';
import DashboardComponent from '../Dashboard';
import SummaryPriceList from '../SummaryPriceList';
import Users from '../Users';
import Prices from '../PriceManager';

interface RouteItem {
  path: string;
  name: string;
  hasAccess: boolean;
  exact?: boolean;
  component: React.ComponentType<any>;
}
const AppRouter = () => {
  const routes = useMemo<RouteItem[]>(
    () => [
      {
        name: 'dasghboard',
        component: DashboardComponent,
        hasAccess: true,
        path: getRoute(DASHBOARD),
      },
      {
        name: 'pricelist',
        component: SummaryPriceList,
        hasAccess: true,
        path: getRoute(SUMMARY_PRICE_LIST),
      },
      {
        name: 'managePriceLists',
        component: Prices,
        hasAccess: true,
        path: getRoute(MANAGE_PRICE_LIST),
      },
      {
        name: 'users',
        component: Users,
        hasAccess: true,
        path: getRoute(USERS),
      },
    ],
    []
  );
  return (
    <>
      <Switch>
        <Route path={getRoute('/')} render={() => <Redirect to={getRoute([SUMMARY_PRICE_LIST])} />} />
        {routes.map((route) => (
          <Route key={route.name} exact={route.exact} path={route.path} component={route.component} />
        ))}
      </Switch>
    </>
  );
};

export default AppRouter;
