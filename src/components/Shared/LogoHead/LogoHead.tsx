import { makeStyles, createStyles, Typography } from '@material-ui/core';
import React from 'react';
import Logo from './Logo/Logo';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(() =>
  createStyles({
    logo: {
      display: 'flex',
      alignItems: 'center',
    },
    logoImage: {
      height: 24,
      verticalAlign: 'top',
      border: 'none',
    },
    title: {
      marginLeft: 12,
    },
  })
);
export default () => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <>
      <div className={classes.logo}>
        <Logo className={classes.logoImage} />
        <Typography color="inherit" variant="h5" component="span" className={classes.title}>
          {t('MEDEX INFO')}
        </Typography>
      </div>
    </>
  );
};
