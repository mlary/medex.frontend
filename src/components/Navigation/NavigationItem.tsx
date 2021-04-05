import React from "react";
import { NavLink as RouterLink } from "react-router-dom";
import {
  ListItem,
  Button,
  colors,
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core";
import clsx from "clsx";
import { IMenuItem } from "./MenuItem";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    item: {
      display: "flex",
      paddingTop: 0,
      paddingBottom: 0,
    },
    hidden: {
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 21,
    },
    button: {
      borderTopRightRadius: 21,
      borderBottomRightRadius: 21,
      color: colors.blueGrey[100],
      justifyContent: "flex-start",
      padding: "10px 10px",
      textTransform: "none",
      letterSpacing: 0,
      width: "100%",
      fontWeight: theme.typography.fontWeightMedium,
    },
    icon: {
      height: 24,
      display: "flex",
      alignItems: "center",
      marginRight: theme.spacing(1),
    },
    active: {
      "&:hover": {
        backgroundColor: theme.palette.primary.main,
      },
      minWidth: 44,
      color: "#fff",
      fontWeight: theme.typography.fontWeightMedium,
      "& $icon": {
        color: "#fff",
      },
      backgroundColor: theme.palette.primary.main,
    },
  })
);

interface IOwnProps {
  page: IMenuItem;
  className?: string;
  hidden?: boolean;
}
type IMyProps = IOwnProps;
const NavigationItem = (props: IOwnProps) => {
  const classes = useStyles();
  const { page, className, hidden } = props;
  return (
    <ListItem className={clsx(classes.item)} disableGutters key={page.Title}>
      <Button
        activeClassName={classes.active}
        className={clsx(classes.button, { [classes.hidden]: hidden })}
        component={RouterLink}
        to={page.Path}
      >
        <div className={classes.icon}>{page.Icon}</div>
        {!hidden && <span className={className}>{page.Title}</span>}
      </Button>
    </ListItem>
  );
};
export default NavigationItem;
