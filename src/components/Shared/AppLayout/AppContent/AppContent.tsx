import React, { HTMLAttributes, ReactElement } from "react";
import { makeStyles, createStyles } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: "100%",
      overflow: "hidden",
      backgroundColor: "#fff",
      padding: theme.spacing(2),
      border: "1px solid #fff",
      [`@media (max-width: ${600}px)`]: {
        padding: theme.spacing(1),
      },
    },
  })
);

const AppContent: React.FC<HTMLAttributes<ReactElement>> = (
  props: HTMLAttributes<ReactElement>
) => {
  const { children, style, className } = props;
  const classes = useStyles();
  return (
    <div className={clsx(classes.root, "app-content", className)} style={style}>
      {children}
    </div>
  );
};
export default AppContent;
