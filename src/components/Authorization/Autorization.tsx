import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Box, Link } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import LanguageMenu from '../Language';
import IconWithSubName from '../Shared/IconWithSubName';
import { IJwtRequest } from '../../services/UserService/models/JwtToken';
import clsx from 'clsx';
import { $account, authorize } from './account.effects';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(8),
    },
    card: {
      maxHeight: '640px',
      maxWidth: '480px',
      backgroundColor: 'white',
    },
    paper: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(8),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    title: {
      marginTop: theme.spacing(2),
      textTransform: 'uppercase',
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    margin: {
      margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: '95%',
    },
    learnMore: {
      marginLeft: theme.spacing(6),
    },
    actions: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: theme.spacing(1),
    },
  })
);

const Authorization = () => {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm<IJwtRequest>();

  const history = useHistory();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { t } = useTranslation();
  const onSubmit = handleSubmit((e) => {
    authorize(e);
  });

  useEffect(() => {
    $account.watch((state) => {
      if (state.isAuthorized) {
        history.push('/');
      }
    });
  }, [history]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <CssBaseline />

      <Card className={classes.card}>
        <div>
          <LanguageMenu />
        </div>
        <CardMedia>
          <IconWithSubName subname={t('Authorization')} />
        </CardMedia>
        <CardContent>
          <form onSubmit={onSubmit}>
            <div>
              <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">{t('Login')}</InputLabel>
                <OutlinedInput
                  name="login"
                  inputRef={register({
                    required: t('Please enter login')?.toString(),
                  })}
                  id="outlined-adornment-password"
                  type="email"
                  endAdornment={
                    <InputAdornment position="end">
                      <MailOutlineIcon />
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
                {errors.login && <Box style={{ color: 'red' }}>{errors.login.message}</Box>}
              </FormControl>
              <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">{t('Password')}</InputLabel>
                <OutlinedInput
                  name="password"
                  inputRef={register({
                    required: t('Please enter password')?.toString(),
                  })}
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
                <div style={{ color: 'red' }}>{errors.password && errors.password.message}</div>
              </FormControl>
              <Box className={classes.actions}>
                <FormControlLabel control={<Checkbox color="primary" />} label={t('Remember me')} />
              </Box>
              <div className={classes.paper}>
                <Button type="submit" variant="contained" color="primary">
                  {t('Sign In')}
                </Button>
                <Link href="/signup">
                  <Button style={{ marginTop: '20px' }} size="small" color="primary">
                    {t('Sign Up')}
                  </Button>
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};
export default Authorization;
