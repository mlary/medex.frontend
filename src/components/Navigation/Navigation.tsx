import React, { useState } from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupIcon from '@material-ui/icons/Group';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ViewListIcon from '@material-ui/icons/ViewList';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import { Typography } from '@material-ui/core';
import ShoppingBasketOutlinedIcon from '@material-ui/icons/ShoppingBasket';
import BarChartOutlinedIcon from '@material-ui/icons/BarChartOutlined';
import { useTranslation } from 'react-i18next';
import { IMenuItem } from './MenuItem';
import NavigationItem from './NavigationItem';
import {
  getRoute,
  USERS,
  STATISTIC,
  PRODUCTS,
  DASHBOARD,
  MANAGE_PRICE_LIST,
  DISTRIBUTORS,
  SUMMARY_PRICE_LIST,
} from '../../constants/pageNames';
import Logo from '../Shared/LogoHead/Logo';
import LogoHead from '../Shared/LogoHead/LogoHead';
import { EnumUserRoles } from '../../constants/enumUserRoles';
import { useStore } from 'effector-react';
import { $account } from '../Authorization/account.effects';
import { $navigation, toggleNavigationPanelState } from './Navigation.effects';

const drawerWidth = 280;
const toolBarHeight = 64;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    hide: {
      display: 'none !important',
    },
    logoIcon: {
      height: 32,
      margin: 'auto',
    },

    title: {
      marginLeft: 5,
    },
    drawer: {
      color: '#fff',
      whiteSpace: 'nowrap',
      [theme.breakpoints.up('lg')]: {
        zIndex: 1200,
        height: '100%',
      },
      '&.drawerOpened, &.drawerHovered  $menuBar': {
        display: 'none',
      },
      '&.drawerOpened, &.drawerHovered $toolBar': {
        display: 'flex',
      },
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      [`@media (max-width: ${1279}px)`]: {
        '&:not($drawerOpened)': {
          width: 0,
        },
        '& $menuItem': {
          display: 'none',
        },
        '& $backItem': {
          display: 'flex',
        },
      },
    },

    mouseEntered: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClosed: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    drawerOpened: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      '& $toolBar': {
        display: 'flex',
      },
      '& $menuBar': {
        display: 'none',
      },
    },
    drawerHovered: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      '& $toolBar': {
        display: 'flex',
      },
      '& $menuBar': {
        display: 'none',
      },
    },
    toolBar: {
      color: 'rgba(255,255,255,0.5)',
      minHeight: toolBarHeight,
      flexDirection: 'column',
      display: 'none',
    },
    menuBar: {
      height: toolBarHeight,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      ...theme.mixins.toolbar,
    },
    barItem: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    titleItem: {
      textAlign: 'center',
      alignSelf: 'center',
      marginTop: 10,
      '& div': {
        marginTop: 20,
      },
      marginBottom: 10,
    },
    itemWrap: {
      margin: 'auto 0',
    },
    menuItem: {},
    backItem: {
      display: 'none',
    },
    head: {
      backgroundColor: '#1e2129',
      padding: theme.spacing(0, 1),
      width: '100%',
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      padding: theme.spacing(1, 1, 1, 0),
    },
    hidden: {
      padding: theme.spacing(1),
      overflow: 'hidden',
    },
    divider: {
      margin: theme.spacing(2, 0),
    },
  })
);

const Navigation = () => {
  const { opened } = useStore($navigation);
  const [hovered, setHovered] = useState(false);
  const classes = useStyles();
  const { currentUser } = useStore($account);
  const { t } = useTranslation();
  const handleToggle = () => {
    toggleNavigationPanelState();
    setHovered(false);
  };
  const handleHovered = (e: boolean) => {
    if (!opened) {
      setHovered(e);
    }
  };
  const menuItems: IMenuItem[] = [
    {
      Hidden: false,
      Icon: <ShoppingBasketOutlinedIcon />,
      Title: t('Last summary price list'),
      Name: 'SummaryPriceList',
      Path: getRoute(SUMMARY_PRICE_LIST),
      SecondaryPath: '/',
      UserRoles: [EnumUserRoles.Administrator, EnumUserRoles.Markerter, EnumUserRoles.Client, EnumUserRoles.Guest],
    },
    {
      Hidden: false,
      Icon: <DashboardIcon />,
      Title: t('Dashboard'),
      Name: 'Dashboard',
      Path: getRoute(DASHBOARD),
      SecondaryPath: '/',
      UserRoles: [EnumUserRoles.Administrator, EnumUserRoles.Markerter],
    },
    {
      Hidden: false,
      Icon: <BarChartOutlinedIcon />,
      Title: t('Statistic'),
      Name: 'Statistic',
      Path: getRoute(STATISTIC),
      SecondaryPath: '/',
      UserRoles: [EnumUserRoles.Administrator, EnumUserRoles.Markerter],
    },
    {
      Hidden: false,
      Icon: <PeopleOutlineIcon />,
      Title: t('Distributor list'),
      Name: 'Distributor list',
      Path: getRoute(DISTRIBUTORS),
      SecondaryPath: '/',
      UserRoles: [EnumUserRoles.Administrator, EnumUserRoles.Markerter],
    },
    {
      Hidden: false,
      Icon: <ViewListIcon />,
      Title: t('Product list'),
      Name: 'Product list',
      Path: getRoute(PRODUCTS),
      SecondaryPath: '/',
      UserRoles: [EnumUserRoles.Administrator],
    },
    {
      Hidden: false,
      Icon: <SettingsIcon />,
      Title: t('Manage price lists'),
      Name: 'Manage price lists',
      Path: getRoute(MANAGE_PRICE_LIST),
      SecondaryPath: '/',
      UserRoles: [EnumUserRoles.Administrator],
    },

    {
      Hidden: false,
      Icon: <GroupIcon />,
      Title: t('Users'),
      Name: 'Users',
      Path: getRoute(USERS),
      SecondaryPath: '/',
      UserRoles: [EnumUserRoles.Administrator],
    },
  ];
  return (
    <Drawer
      onMouseEnter={() => {
        handleHovered(true);
      }}
      onMouseLeave={() => {
        handleHovered(false);
      }}
      variant="permanent"
      classes={{
        paper: clsx(classes.drawer, {
          [classes.drawerOpened]: opened,
          [classes.drawerHovered]: hovered,
        }),
      }}
    >
      <div className={classes.head}>
        <div className={classes.toolBar}>
          <div className={classes.barItem}>
            <div className={classes.itemWrap}>
              <LogoHead />
            </div>
            <div className={clsx(classes.itemWrap, classes.menuItem)}>
              <IconButton onClick={handleToggle} color="inherit">
                <MenuIcon />
              </IconButton>
            </div>
            <div className={clsx(classes.itemWrap, classes.backItem)}>
              <IconButton onClick={handleToggle} color="inherit">
                <ArrowBackIcon color="inherit" />
              </IconButton>
            </div>
          </div>
          <div className={classes.titleItem}>
            <div style={{ color: '#fff' }}>
              <Typography variant="h4" color="inherit">
                {`${currentUser?.fullName}`}
              </Typography>
            </div>
            <div>
              <Typography variant="h6" color="inherit">
                {`${currentUser?.login}`}
              </Typography>
            </div>
          </div>
        </div>
        <div className={classes.menuBar}>
          <div>
            <Logo className={classes.logoIcon} />
          </div>
        </div>
      </div>
      <Divider />
      <div
        className={clsx(classes.root, {
          [classes.hidden]: !opened && !hovered,
        })}
      >
        {currentUser && (
          <List
            className={clsx(classes.root, {
              [classes.hidden]: !opened && !hovered,
            })}
          >
            {menuItems
              .filter((menu) => {
                let grantAccess = false;
                if (menu.UserRoles.includes(currentUser.userRole) && !menu.forceDisableAccess) {
                  grantAccess = true;
                }

                return grantAccess;
              })
              .map((menu) => (
                <NavigationItem key={`menu-item-${menu.Name}`} page={menu} hidden={!opened && !hovered} />
              ))}
          </List>
        )}
      </div>
      <Divider />
    </Drawer>
  );
};
export default Navigation;
