import React, { useEffect } from 'react';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Card, CardContent, CardMedia } from '@material-ui/core';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import InputMask from 'react-input-mask';
import { UserRegistrationDto } from '../../services/UserService/models/User';
import IconWithSubName from '../Shared/IconWithSubName';
import { signup, $account } from '../Authorization/account.effects';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      backgroundColor: 'white',
      marginTop: theme.spacing(2),
    },
    paper: {
      marginTop: theme.spacing(4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    margin: {
      margin: theme.spacing(1),
    },
    textField: {
      width: '95%',
    },
    learnMore: {
      marginLeft: theme.spacing(8),
    },
  })
);

export default function () {
  const classes = useStyles();
  const { t } = useTranslation();
  const history = useHistory();
  const { register, handleSubmit, errors, watch } = useForm<UserRegistrationDto>();
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const onSubmit = handleSubmit((e) => {
    signup(e);
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    $account.watch((state) => {
      if (state.signupSuccessed) {
        history.push('/');
      }
    });
  }, []);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <Card className={classes.root}>
        <CardMedia>
          <IconWithSubName subname={t('Sign Up')} />
        </CardMedia>
        <CardContent>
          <form onSubmit={onSubmit}>
            <div>
              <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">{t('Surname')}</InputLabel>
                <OutlinedInput
                  name="lastName"
                  inputRef={register({ required: true })}
                  id="outlined-adornment-password"
                  type="text"
                  endAdornment={
                    <InputAdornment position="end">
                      <AccountCircleOutlinedIcon />
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </FormControl>
              <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">{t('First Name')}</InputLabel>
                <OutlinedInput
                  name="firstName"
                  inputRef={register({ required: true })}
                  id="outlined-adornment-password"
                  type="text"
                  endAdornment={
                    <InputAdornment position="end">
                      <AccountCircleOutlinedIcon />
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </FormControl>
              <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">{t('Middle Name')}</InputLabel>
                <OutlinedInput
                  name="middleName"
                  inputRef={register({ required: true })}
                  id="outlined-adornment-password"
                  type="text"
                  endAdornment={
                    <InputAdornment position="end">
                      <AccountCircleOutlinedIcon />
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </FormControl>
              <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
                <OutlinedInput
                  name="email"
                  inputRef={register({ required: true })}
                  id="outlined-adornment-password"
                  type="email"
                  endAdornment={
                    <InputAdornment position="end">
                      <MailOutlineIcon />
                    </InputAdornment>
                  }
                  labelWidth={50}
                />
              </FormControl>
              <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">{t('Phone')}</InputLabel>
                <InputMask mask="(\9\9\8) 99 999-99-99">
                  {() => (
                    <OutlinedInput
                      name="phone"
                      inputRef={register({ required: true })}
                      id="outlined-adornment-password"
                      type=""
                      endAdornment={
                        <InputAdornment position="end">
                          <MailOutlineIcon />
                        </InputAdornment>
                      }
                      labelWidth={50}
                    />
                  )}
                </InputMask>
              </FormControl>
              <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">{t('Password')}</InputLabel>
                <OutlinedInput
                  name="password"
                  inputRef={register({
                    required: true,
                    minLength: {
                      value: 6,
                      message: t('Must be atleast 6 character'), // <p>error message</p>
                    },
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
              <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">{t('Confirm Password')}</InputLabel>
                <OutlinedInput
                  name="confirmPassword"
                  inputRef={register({
                    validate: (value) => value === watch('password') || 'Password not match',
                    required: true,
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
                  labelWidth={120}
                />
                <div style={{ color: 'red' }}>{errors.confirmPassword && errors.confirmPassword.message}</div>
              </FormControl>
              <div className={classes.paper}>
                <Button type="submit" variant="contained" color="primary">
                  {t('Sign Up')}
                </Button>
                <p style={{ marginTop: '20px' }}>{t('Already Authorized?')}</p>
                <Link href="/login">
                  <Button style={{ fontSize: '12px' }} size="small" color="primary">
                    {t('Sign In')}
                  </Button>
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}
