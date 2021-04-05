import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { ReactComponent as Logo } from '../../../assets/images/logo.svg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    title: {
      marginTop: theme.spacing(2),
      textTransform: 'uppercase',
    },
  })
);
interface Subname {
  subname: string;
}
export default function IconWithSubName(props: Subname) {
  const classes = useStyles();
  const { subname } = props;
  return (
    <div className={classes.paper}>
      <Logo />
      <Typography component="h1" variant="h4" className={classes.title}>
        {subname}
      </Typography>
    </div>
  );
}
