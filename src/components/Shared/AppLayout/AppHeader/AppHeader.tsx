import React, { HTMLAttributes, ReactElement } from 'react';
import { makeStyles, createStyles } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.primary.main,
      padding: theme.spacing(2, 2, 2, 2),
      border: 'none',
      color: '#fff',
    },
  })
);

const AppHeader: React.FC<HTMLAttributes<ReactElement>> = (props: HTMLAttributes<ReactElement>) => {
  const { children, style, className } = props;
  const classes = useStyles();
  return (
    <div className={clsx(classes.root, 'app-header', className)} style={style}>
      {children}
    </div>
  );
};
export default AppHeader;
