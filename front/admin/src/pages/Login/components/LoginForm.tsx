import React, { useState } from 'react';
import { Field, reduxForm, InjectedFormProps, Form, getFormValues } from 'redux-form';
import Grid from '@material-ui/core/Grid';
import Button from '@components/Button/Button';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Input from '@components/Input/Input';
import { validate, helpers as validateHelpers } from '@helpers/validate';
import { fields } from '@constants/validation';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { ILoginState, Error } from '../types';
import { IStore } from '@store/reducer';
import { isLoadingSelector, errorsSelector } from '../redux/selectors';
import { LOGIN_FORM_NAME } from '../redux/constants';

const useStyles = makeStyles((theme: Theme) => {
  return {
    item: {
      marginBottom: theme.spacing(2),
    },
    submit: {
      marginTop: theme.spacing(3),
      paddingBottom: theme.spacing(2),
    },
  };
});

interface IProps {
  isLoading: boolean;
  error?: Error;
}

const LoginForm: React.FunctionComponent<InjectedFormProps & IProps> = props => {
  const { handleSubmit, isLoading, error } = props;
  const classes = useStyles();

  // console.log(error);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid direction="column" container>
        <div className={classes.item}>
          <Field
            name="login"
            component={Input}
            label="Логин"
            fullWidth
            error={typeof error === 'object' && error.login}
          />
        </div>
        <div className={classes.item}>
          <Field
            name="password"
            component={Input}
            type="password"
            label="Пароль"
            fullWidth
            error={typeof error === 'object' && error.password}
          />
        </div>
        <div className={classes.submit}>
          <Button type="submit" variant="contained" color="primary" isLoading={isLoading} spinnerColor="green">
            Войти
          </Button>
        </div>
      </Grid>
    </Form>
  );
};

export default compose<any>(
  reduxForm({
    form: LOGIN_FORM_NAME,
    validate: validate<Partial<ILoginState>>({
      login: {
        isRequired: true,
      },
    }),
  }),
  connect((store: IStore) => {
    return {
      isLoading: isLoadingSelector(store),
      error: errorsSelector(store),
    };
  }, {}),
)(LoginForm);
