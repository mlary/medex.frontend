import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import Loadable from 'react-loadable';
import { ThemeProvider } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import './index.css';
import Notifications from './components/Notifications/InternalNotifications';
import SpinnerContainer from './components/Spinner/SpinnerContainer';
import { getRoute, LOGIN, SIGNUP } from './constants/pageNames';
import './translation';
import Spinner from './components/Spinner';
import theme from './theme';
import { useStore } from 'effector-react';
import { $language } from './components/Language/Language.effects';
import i18n from './translation/translation';

const clientVersion: string = localStorage.getItem('REACT_APP_VERSION') || '';
const actualVersion = '3.3.4';
console.log(navigator.language);
if (!clientVersion) {
  localStorage.clear();
  localStorage.setItem('REACT_APP_VERSION', actualVersion);
} else if (clientVersion !== actualVersion) {
  localStorage.clear();
  localStorage.setItem('REACT_APP_VERSION', actualVersion);
}
const LoadableAuthorization = Loadable({
  loader: () => import('./components/Authorization'),
  loading: () => <Spinner />,
});
const LoadableSignup = Loadable({
  loader: () => import('./components/SignUp'),
  loading: () => <Spinner />,
});
const LoadableApp = Loadable({
  loader: () => import('./components/App'),
  loading: () => <Spinner />,
});

const Main = () => {
  const language = useStore($language);
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <SpinnerContainer />
        <Notifications />
        <Router>
          <Switch>
            <Route exact path={getRoute(LOGIN)} component={LoadableAuthorization} />
            <Route exact path={getRoute(SIGNUP)} component={LoadableSignup} />
            <Route path="/" component={LoadableApp} />
          </Switch>
        </Router>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};
ReactDOM.render(<Main />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
