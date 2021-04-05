import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, createStyles } from '@material-ui/core';

const useStyle = makeStyles(() => createStyles({
  spinner: {
    zIndex: 1400,
    position: "fixed",
    width: "4em !important",
    height: "4em !important",
    top: "40%",
    left: "50%",
    marginTop: "-2em !important",
    marginLeft: "-2em !important",
  },
}));
export default function () {
  const classes = useStyle();
  return (
    <CircularProgress className={classes.spinner} />
  );
}
