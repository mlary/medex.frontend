import React, { HTMLAttributes, ReactElement } from 'react';
import { makeStyles, createStyles } from '@material-ui/core';
import clsx from 'clsx';

const useStyle = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
      zIndex: 2,
      height: '100%',
    },
  })
);

const AppLayout: React.FC<HTMLAttributes<ReactElement>> = (props: HTMLAttributes<ReactElement>) => {
  const { children, style, className } = props;
  const classes = useStyle();
  return (
    <div className={clsx(classes.root, 'app-layout', className)} style={style}>
      {children}
    </div>
  );
};
export default AppLayout;
