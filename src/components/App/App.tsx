import React, { useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, createStyles, Box, Theme } from '@material-ui/core';
import clsx from 'clsx';
import { $account, fetchCurrentUser, logout } from '../Authorization/account.effects';
import { useStore } from 'effector-react';
import { $navigation } from '../Navigation/Navigation.effects';
import AppRouter from './App.router';
import Header from '../Header';
import Navigation from '../Navigation/Navigation';
import { getRoute, LOGIN } from '../../constants/pageNames';
import { useHistory } from 'react-router';
import { fetchDictionaries } from '../Dictionaries/Dictionaries.effects';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    shiftLeft72: {
      marginLeft: 72,
    },
    shiftLeft280: {
      marginLeft: 280,
    },
    content: {
      height: '100%',
      [`@media (max-width: ${1279}px)`]: {
        marginLeft: 0,
      },
      zIndex: 1,
      paddingTop: 64,
      position: 'relative',
      backgroundColor: '#f4f6f8',
    },
    headContent: {
      width: '100%',
      marginTop: 64,
      backgroundColor: theme.palette.primary.main,
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
      height: 160,
    },
    title: {
      color: '#fff',
    },
  })
);
const App = () => {
  const classes = useStyles();
  const { isAuthorized } = useStore($account);
  const { opened } = useStore($navigation);
  const history = useHistory();
  useEffect(() => {
    if (!isAuthorized) {
      logout();
      history.push(getRoute(LOGIN));
    } else {
      fetchCurrentUser();
      fetchDictionaries();
    }
  }, [isAuthorized]);

  return (
    <>
      <Navigation />
      <Header />
      <CssBaseline />
      <Box className={clsx(classes.headContent)} />
      <main className={clsx(classes.content, opened ? classes.shiftLeft280 : classes.shiftLeft72)}>
        <AppRouter />
      </main>
    </>
  );
};

export default App;
