import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import CssBaseline from "@material-ui/core/CssBaseline";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Hidden, colors } from "@material-ui/core";
import InputIcon from "@material-ui/icons/Input";
import LanguageMenu from "../Language";
import { toggleNavigationPanelState } from "../Navigation/Navigation.effects";
import { $account, logout } from "../Authorization/account.effects";
import { useStore } from "effector-react";

const drawerWidth = 300;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    flexGrow: {
      flexGrow: 1,
    },
    signOutButton: {
      marginLeft: theme.spacing(1),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: "none",
    },
    title: {
      flexGrow: 4,
      "& > *": {
        marginRight: "2em",
        color: colors.green[400],
      },
    },
  })
);

const Header = () => {
  const classes = useStyles();
  const handleLogout = () => {
    logout();
  };
  const { currentUser } = useStore($account);
  return (
    <>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <div>
            <IconButton
              edge="end"
              onClick={() => {
                toggleNavigationPanelState();
              }}
            >
              <MenuIcon />
            </IconButton>
          </div>
          <div>
            <LanguageMenu />
            <Hidden>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              {currentUser?.fullName}
              <IconButton
                className={classes.signOutButton}
                color="inherit"
                onClick={handleLogout}
              >
                <InputIcon />
              </IconButton>
            </Hidden>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};
export default Header;
